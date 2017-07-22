FROM node:8.2-alpine

RUN mkdir /gateway && chmod 777 /gateway
WORKDIR /gateway

COPY . /gateway

RUN npm install -g
