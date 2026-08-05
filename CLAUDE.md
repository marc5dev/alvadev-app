# alvadev-app
Node.js app served at app.alvadev.com from the Hetzner VPS (Docker).
Every push to main auto-deploys via GitHub Actions (SSH → git pull →
docker compose up -d --build webapp). Deploys take ~1 minute.
server.js is the whole app; it must listen on 0.0.0.0:3000.
The MESSAGE constant is the traditional deploy-test lever.
