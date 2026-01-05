import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  submitEarlyAccess,
  getEarlyAccessMessage,
  getUTMParamsFromURL,
} from "@/lib/api";

const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "נא להזין כתובת אימייל" })
    .email({ message: "כתובת אימייל לא תקינה" })
    .max(255, { message: "כתובת אימייל ארוכה מדי" }),
});

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignupModal = ({ open, onOpenChange }: SignupModalProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse({ email });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      // Get UTM parameters from URL
      const utmParams = getUTMParamsFromURL();

      // Submit to API
      const response = await submitEarlyAccess(email, utmParams);

      setIsLoading(false);

      if (response.status === "error") {
        setError(response.error || "משהו השתבש, אפשר לנסות שוב.");
        return;
      }

      // Success - show appropriate message
      const message = getEarlyAccessMessage(response.status);
      setSuccessMessage(message);
      setIsSubmitted(true);
    } catch (err) {
      setIsLoading(false);
      setError("משהו השתבש, אפשר לנסות שוב.");
    }
  };

  const handleClose = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when closing
      setTimeout(() => {
        setEmail("");
        setError("");
        setIsSubmitted(false);
        setSuccessMessage("");
      }, 200);
    }
    onOpenChange(newOpen);
  };

  const handleSkip = () => {
    handleClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-xl p-8">
        {!isSubmitted ? (
          <>
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-xl font-semibold text-foreground">
                רוצה להצטרף להרשמה מוקדמת?
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                אנחנו פותחים בקרוב פיילוט למספר מצומצם של מטפלים.
                <br />
                השארת מייל תאפשר לנו לעדכן אותך ראשונים עם פתיחת ההרשמה.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="הכנס/י כתובת אימייל"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="h-12 text-base rounded-lg border-border focus:border-primary"
                  dir="ltr"
                  autoComplete="email"
                />
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "שולח..." : "שלח"}
              </Button>

              <button
                type="button"
                onClick={handleSkip}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                אפשר גם אחר כך
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {successMessage || "תודה!"}
            </h3>
            {successMessage.includes("תודה") && (
              <p className="text-muted-foreground">
                נעדכן אותך בקרוב.
              </p>
            )}
            <Button
              variant="ghost"
              onClick={() => handleClose(false)}
              className="mt-4"
            >
              סגור
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;