FROM node:16.13.0

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

ARG MONGODB_URI_CONNECTION;
ARG PETICOES_DB
ARG PETICOES_DB
ARG PETICAO_COLLECTION

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
