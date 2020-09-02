FROM node:lts-alpine

WORKDIR /app
RUN apk add git
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build && chown node:node /app

EXPOSE ${PORT}

USER node
CMD [ "npm", "run", "start:prod" ]