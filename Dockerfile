#building angular App
FROM public.ecr.aws/bitnami/node:8.17.0-prod as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
ARG IMAGE_TAG=dev
RUN npm run build -- --prod --configuration $IMAGE_TAG

# building nginx
FROM public.ecr.aws/nginx/nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=node /app/dist/rexconnect-ui/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
