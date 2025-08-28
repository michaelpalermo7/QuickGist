# ---------- build stage ----------
FROM node:20-bullseye AS builder
WORKDIR /app

# Install Node deps WITHOUT the lockfile (re-resolve for Linux)
COPY package.json ./
RUN npm install --no-audit --no-fund --omit=optional

# Copy source and build TS -> JS
COPY . .
RUN npm run build    # expects "build": "tsc" and outDir=dist

# ---------- runtime stage ----------
FROM node:20-bullseye AS runtime
WORKDIR /app

# Python runtime (if your app needs it)
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

# Install ONLY production deps, again without lockfile
COPY package.json ./
RUN npm install --no-audit --no-fund --omit=dev --omit=optional

# Python deps (optional)
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Bring compiled JS
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PYTHON_BIN=python3
EXPOSE 5001

# Optional healthcheck (adjust path)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:5001/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "dist/server.js"]
