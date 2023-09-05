FROM node:18.17 AS builder

WORKDIR D:\Learn

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]