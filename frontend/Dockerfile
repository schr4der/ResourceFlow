# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . ./

# Build the React app for production
RUN npm run build

# Expose the port the app will run on
EXPOSE 80

CMD ["npm", "start"]
