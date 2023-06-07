FROM node:18.13.0 as development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build