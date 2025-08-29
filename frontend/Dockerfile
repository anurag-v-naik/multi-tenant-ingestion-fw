# --- Stage 1: Build Stage ---
# Use a specific Node.js version for the build environment.
FROM node:18-alpine AS build

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies.
# This improves Docker layer caching.
COPY package*.json ./

# Install application dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Run the build command. This creates the 'build' directory with the static files.
RUN npm run build

# --- Stage 2: Production Stage ---
# Use a lightweight Nginx image to serve the static files.
# Nginx is an excellent web server for serving static content.
FROM nginx:1.21.6-alpine

# Copy the built application from the 'build' stage into the Nginx container.
# The 'build' directory from the first stage is copied to the Nginx default directory.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80, which is the default for Nginx.
EXPOSE 80

# The default command for Nginx is to start the server.
CMD ["nginx", "-g", "daemon off;"]

