# Step 1: Build the React frontend
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Step 2: Set up the Node.js Express backend
FROM node:20-alpine
WORKDIR /app

# Copy server package files and install production dependencies
COPY server/package*.json ./
RUN npm ci --only=production

# Copy server code
COPY server/ ./src/

# Copy the compiled client frontend build directly into server's public directory
COPY --from=client-builder /app/client/dist ./public

# Environment defaults
ENV PORT=5000
ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "src/server.js"]
