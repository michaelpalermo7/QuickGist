# Dockerfile (build to JS, run with node)
FROM node:20-bullseye AS base
WORKDIR /app

# Python layer for runtime
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

# ---- deps (cached) ----
COPY package*.json ./
RUN npm ci

# Python deps
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# ---- build ----
COPY . .
RUN npm run build  # compiles TS -> dist/

# ---- runtime ----
EXPOSE 5001
ENV NODE_ENV=production
ENV PYTHON_BIN=python3

# Optional healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:5001/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "dist/server.js"]
