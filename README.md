# alvadev-app

Zero-dependency Node.js web app that runs in Docker on the Hetzner VPS, reachable at app.alvadev.com.

It serves **ALVA // FLUX** — a real-time GPU fluid simulation (Navier–Stokes,
solved on the GPU in WebGL2) driving 65,536 particles that hold the shape of a
word until you stir them apart. Drag to paint velocity into the fluid; the
particles get caught in the flow and spring back into formation.

- `server.js` — the HTTP server. Edit `MESSAGE` to test deploys.
- `app.html` — the front end: hand-rolled WebGL2, no libraries.
- `Dockerfile` — recipe to build the app into a Docker image.

Endpoints: `/` (the app) · `/health` · `/api/stats` (live uptime for the HUD).

Controls: drag to stir · `1`–`6` word · `P` palette · `space` burst ·
`R` reset · `S` save PNG · `H` hide UI.
- `.github/workflows/deploy.yml` — auto-deploys to the VPS on every push to `main`.

See the ALVADEV master guide, Parts 10–11, for setup.
