FROM node:18-alpine AS builder

WORKDIR /app

# Build frontend
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client ./client
RUN cd client && npm run build

# Setup backend
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server ./server

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY --from=builder /app/server ./server
# Copy built frontend into server's public directory
COPY --from=builder /app/client/build ./server/build

WORKDIR /app/server

EXPOSE 10000

CMD ["node", "index.js"]
