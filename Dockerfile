V# Stage 1: Build the backend and frontend
FROM node:18-alpine AS builder

# Set up backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install

# Set up frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy source code and build
WORKDIR /app
COPY . .

WORKDIR /app/backend
RUN npm run build

WORKDIR /app/frontend
RUN npm run build

# Stage 2: Final image
FROM node:18-alpine

WORKDIR /app

# Copy built backend and node_modules
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/node_modules ./backend/node_modules

# Copy built frontend
COPY --from=builder /app/frontend/build ./frontend/build

# Copy the Python engine
COPY engine ./engine

EXPOSE 3001

CMD ["node", "backend/dist/server.js"]
