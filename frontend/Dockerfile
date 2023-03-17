# Start with a base image that includes Node.js and Alpine Linux
FROM node:15.9-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Expose port 3000 for the Vite app to listen on
EXPOSE 3000

# Start the Vite app when the container starts
CMD ["npm", "run", "dev"]
