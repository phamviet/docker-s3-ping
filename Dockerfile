FROM node:10-alpine

WORKDIR /usr/src/app
COPY package*.json index.js ./
RUN npm ci --only=production

EXPOSE 80
CMD [ "npx", "micro", "-l", "tcp://0.0.0.0:80" ]
