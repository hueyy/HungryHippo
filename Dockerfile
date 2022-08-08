FROM node:18.7.0-alpine3.14

WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build && chown node:node /app

EXPOSE ${PORT}

USER node
CMD [ "npm", "run", "start:prod" ]
