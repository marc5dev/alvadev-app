// The simplest possible real web app: plain Node.js, no frameworks.
// It answers every visitor with a small HTML page, plus a /health check.

const http = require("http");

// Change this text, push to GitHub, and watch it go live. That's your test.
const MESSAGE = "Hello from the Hetzner VPS 👋";
const VERSION = "1.0.0";

const server = http.createServer((req, res) => {
  // A "health" endpoint: machines ask this URL "are you alive?"
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", version: VERSION }));
    return;
  }

  // Every other URL gets the homepage.
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>alvadev app</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; background: #101216; color: #eceef2;
         display: grid; place-items: center; min-height: 100vh; margin: 0; }
  main { text-align: center; padding: 20px; }
  h1 { letter-spacing: -0.02em; }
  p  { color: #9aa3b2; }
  code { font-family: ui-monospace, monospace; color: #7ea2ff; }
</style></head>
<body><main>
  <h1>${MESSAGE}</h1>
  <p>version <code>${VERSION}</code> · served at ${new Date().toISOString()}</p>
  <p>This container was built from the <code>alvadev-app</code> repo.</p>
</main></body></html>`);
});

// 0.0.0.0 means "listen on all network interfaces".
// Inside a container this is required — "localhost" would only listen
// inside the container itself and nothing could ever reach it.
server.listen(3000, "0.0.0.0", () => {
  console.log("alvadev-app listening on port 3000");
});
