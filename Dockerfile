# Stage 1: Build the React app
FROM node:20-alpine AS build-client

WORKDIR /usr/src/app

# Copy frontend package.json and package-lock.json
COPY client/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY client .

# Build React app
RUN npm run build

# Stage 2: Build the backend and create the final image
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy backend package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy entire source code
COPY . .

# Copy built frontend files from the 'build-client' stage
COPY --from=build-client /usr/src/app/build ./client/build

# Expose port 8080
EXPOSE 8080

# Run the server
CMD ["node", "app.js"]