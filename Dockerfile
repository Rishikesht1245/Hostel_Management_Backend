# Use a base image
FROM node:20.14.0-alpine

# Set environment variables
ENV CLOUDINARY_API_KEY=573665132778922 \
    CLOUDINARY_API_SECRET=IWXrmDL1DfQxbvV_mOAv1oDhq7g \
    CLOUDINARY_CLOUD_NAME=djcn6luvw \
    TRANSPORTER_USERNAME=hchiefwarden@gmail.com \
    TRANSPORTER_PASSWORD="sbkc oymm bmsh frpp" \
    RAZORPAY_API_SECRET=yeZ1JRMsKB9wDAK8qp2MXhxV \
    RAZORPAY_API_ID=rzp_test_52pMKUsVhUtk2U \
    PORT=3000 \
    MONGO_URI='mongodb+srv://rishikeshtharayil:0YhEX4uvpZcTz1ab@cluster0.4tuvlcb.mongodb.net/?retryWrites=true&w=majority' \
    JWT_SECRET=Hello I am randow JWT Secre1245t \
    FRONT_END_URL=http://localhost:5173 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "run", "start:run"]