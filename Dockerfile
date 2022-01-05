FROM node:12-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
#CMD ["npm","start"]

FROM nginx:1-alpine
RUN apk add --no-cache bash

ENV LISTEN_PORT $PORT
EXPOSE $PORT

COPY --from=builder ./app/build /usr/share/nginx/html/


