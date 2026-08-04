# alvadev-app

Tiny Node.js web app that runs in Docker on the Hetzner VPS, reachable at app.alvadev.com.

- `server.js` — the whole app. Edit `MESSAGE` to test deploys.
- `Dockerfile` — recipe to build the app into a Docker image.
- `.github/workflows/deploy.yml` — auto-deploys to the VPS on every push to `main`.

See the ALVADEV master guide, Parts 10–11, for setup.
