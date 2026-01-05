# Local Development Setup

For local development, you need to run both the Vite dev server and the API server.

## Quick Start

Run both servers at once:
```bash
npm run dev:all
```

This will start:
- API server on http://localhost:3001
- Vite dev server on http://localhost:8080 (or 5173)

## Manual Start (if needed)

If you prefer to run them separately:

**Terminal 1 - API Server:**
```bash
npm run dev:server
```

**Terminal 2 - Vite Dev Server:**
```bash
npm run dev
```

## How It Works

- The API server (Express) runs on port 3001 and handles `/api/early-access` requests
- Vite proxy forwards all `/api/*` requests to the API server
- When deployed to Vercel, the `api/early-access.ts` serverless function handles the requests instead

## Troubleshooting

**"Port 3001 already in use"**
- Another process is using port 3001
- Kill the process or change the port in `server.js`

**"Cannot connect to API"**
- Make sure both servers are running
- Check that `.env.local` exists with your Supabase credentials
- Verify the API server started successfully (you should see "🚀 API server running")

