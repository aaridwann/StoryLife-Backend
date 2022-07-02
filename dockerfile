FROM node:alpine

WORKDIR /app
COPY . /app
RUN npm install 
ENV PORT=8080

RUN ["npm","start"]