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

# Stage 2: Use Nginx for production
FROM nginx:alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx default)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Start Node.js application
CMD ["npm", "run", "start"]
