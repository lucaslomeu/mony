# STAGE 1: Build Angualr App
FROM node:18.19.1 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . . 
RUN npm run build

# STAGE 2: Nginx to server the app
FROM nginx:stable-alpine
COPY --from=build /app/dist/client/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

