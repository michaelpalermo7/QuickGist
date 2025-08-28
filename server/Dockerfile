# -------- build stage --------
FROM node:20-bullseye AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# -------- runtime stage --------
FROM node:20-bullseye AS runtime
WORKDIR /app
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm ci --omit=dev
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
ENV PYTHON_BIN=python3
EXPOSE 5001
CMD ["node", "dist/server.js"]
