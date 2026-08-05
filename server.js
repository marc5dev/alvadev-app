// alvadev-app — a tiny zero-dependency Node server.
// It serves one thing: ALVA // FLUX, a real-time GPU fluid simulation
// (app.html), plus two small JSON endpoints so the page can show live
// proof that this container is the one answering.

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Change this text, push to GitHub, and watch it go live. That's your test.
// It renders under the logo in the top-left corner of the app.
const MESSAGE = "Navier–Stokes on the GPU · 65,536 particles";
const VERSION = "2.0.0";

const STARTED_AT = Date.now();
let requests = 0;

// The page is read once at boot and kept in memory — it never changes at
// runtime, so there is no reason to touch the disk on every request.
const PAGE = buildPage();

function buildPage() {
  try {
    const html = fs.readFileSync(path.join(__dirname, "app.html"), "utf8");
    return html
      .replace(/__MESSAGE__/g, escapeHtml(MESSAGE))
      .replace(/__VERSION__/g, escapeHtml(VERSION));
  } catch (err) {
    console.error("could not read app.html:", err.message);
    return `<!doctype html><meta charset="utf-8"><title>alvadev app</title>
<body style="font:16px system-ui;background:#05060a;color:#eee;display:grid;place-items:center;min-height:100vh;margin:0">
<main style="text-align:center"><h1>${escapeHtml(MESSAGE)}</h1>
<p style="color:#7d879c">version ${escapeHtml(VERSION)} — app.html is missing from the image.</p></main>`;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function json(res, code, body) {
  const payload = JSON.stringify(body);
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Cache-Control": "no-store"
  });
  res.end(payload);
}

const server = http.createServer((req, res) => {
  requests++;
  const url = (req.url || "/").split("?")[0];

  // A "health" endpoint: machines ask this URL "are you alive?"
  if (url === "/health") {
    return json(res, 200, { status: "ok", version: VERSION });
  }

  // Live telemetry for the HUD in the top-right corner of the app.
  if (url === "/api/stats") {
    return json(res, 200, {
      status: "ok",
      version: VERSION,
      message: MESSAGE,
      uptime: (Date.now() - STARTED_AT) / 1000,
      requests,
      node: process.version,
      host: os.hostname(),
      startedAt: new Date(STARTED_AT).toISOString()
    });
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "Allow": "GET, HEAD" });
    return res.end();
  }

  // Every other URL gets the app.
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Content-Length": Buffer.byteLength(PAGE),
    "Cache-Control": "no-cache",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer"
  });
  res.end(req.method === "HEAD" ? undefined : PAGE);
});

// 0.0.0.0 means "listen on all network interfaces".
// Inside a container this is required — "localhost" would only listen
// inside the container itself and nothing could ever reach it.
server.listen(3000, "0.0.0.0", () => {
  console.log(`alvadev-app v${VERSION} listening on port 3000`);
});
