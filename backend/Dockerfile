# Use a lightweight Node.js base image.
FROM node:18-alpine

# Set the working directory inside the container.
WORKDIR /app

# Copy the package.json and package-lock.json files.
# This helps with caching layers so npm install is only re-run when dependencies change.
COPY package*.json ./

# Install application dependencies.
RUN npm install

# Copy the rest of the application's source code.
COPY . .

# Expose the port where the backend server will listen.
# This is commonly port 8080 or a different port than the frontend.
EXPOSE 8080

# The command to start the backend server.
# This assumes your main server file is named index.js or app.js.
# Adjust this command if your entry file has a different name.
CMD ["node", "index.js"]

