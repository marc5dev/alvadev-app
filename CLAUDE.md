# alvadev-app
Node.js app served at app.alvadev.com from the Hetzner VPS (Docker).
Every push to main auto-deploys via GitHub Actions (SSH → git pull →
docker compose up -d --build webapp). Deploys take ~1 minute.
server.js is the server; it must listen on 0.0.0.0:3000.
app.html is the front end (ALVA // FLUX — a WebGL2 fluid sim). It is read
once at boot and served on every route; __MESSAGE__ and __VERSION__ are
substituted in. Both files must be COPYed in the Dockerfile.
The MESSAGE constant is the traditional deploy-test lever — it renders
under the logo, top-left.
