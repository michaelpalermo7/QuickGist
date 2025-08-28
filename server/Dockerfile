# -------- build stage (with dev deps) --------
FROM node:20-bullseye AS builder
WORKDIR /app

# Install Node deps (include devDeps for TypeScript build)
COPY package*.json ./
RUN npm install --omit=optional

# Copy source and build TS -> JS
COPY . .
RUN npm run build   # outputs to dist/ (set in tsconfig.json)

# -------- runtime stage (only prod deps) --------
FROM node:20-bullseye AS runtime
WORKDIR /app

# Install Python (runtime)
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

# Install only production Node deps (skip optional)
COPY package*.json ./
RUN npm install --omit=dev --omit=optional

# Python deps
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Bring in compiled JS from builder stage
COPY --from=builder /app/dist ./dist

# Environment & networking
ENV NODE_ENV=production
ENV PYTHON_BIN=python3
EXPOSE 5001

# Healthcheck (optional — adjust /api/health if needed)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:5001/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

# Start compiled server
CMD ["node", "dist/server.js"]
