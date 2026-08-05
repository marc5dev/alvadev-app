# A Dockerfile is a recipe. Docker follows it top to bottom
# and the result is an "image" — a frozen, ready-to-run copy of the app.

# 1. Start from an official base image: Linux + Node.js 24 preinstalled.
#    "alpine" = a very small Linux, keeps the image tiny.
FROM node:24-alpine

# 2. All following commands run inside /app in the image.
WORKDIR /app

# 3. Copy the server code and the app page from the repo into the image.
COPY server.js .
COPY app.html .

# 4. Documentation: this app talks on port 3000.
EXPOSE 3000

# 5. What to run when a container starts from this image.
CMD ["node", "server.js"]
