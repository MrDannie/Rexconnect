#building angular App
FROM node:8.12.0 as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
ARG IMAGE_TAG=dev
RUN npm run build -- --prod --configuration $IMAGE_TAG

# building nginx
FROM nginx:1.12.2-alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=node /app/dist/integrator-ui/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
