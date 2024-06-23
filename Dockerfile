# Stage 1: Build the Node.js application
FROM node:20.14.0-alpine as build

# Set environment variables
ENV PORT=3000

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code (if applicable)
RUN npm run build

# Start Node.js application
CMD ["npm", "run", "start"]
