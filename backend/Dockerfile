# Start with a base image that includes Node.js and Alpine Linux
FROM node:18.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install


COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN npm run prisma:generate

# Copy the application code into the container
COPY . .

# Expose port 3333 for the NestJS app to listen on
EXPOSE 3333

RUN npm run migrate:deploy

# Start the NestJS app when the container starts
CMD ["npm", "start"]
