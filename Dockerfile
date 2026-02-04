# Stage 1: The Build
FROM node:20 AS build-stage

WORKDIR /app

# Copy package files first to cache the 'npm install' step
COPY package*.json ./

RUN npm install

# Copy everything from root (including source code)
COPY  . .

# Generate the production static files in /dist
RUN npm build --configuration=production

# Stage 2: The Server
FROM nginx:alpine

# Copy the compiled files from the build-stage to Nginx's hosting folder
COPY --from=build-stage /app/dist/CAR-RENTAL-AGENCY/browser /usr/share/nginx/html

# Copy a custom config to handle Angular routing (refreshing the page)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80