FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .

EXPOSE ${PORT}

USER node
CMD [ "npm", "run", "start" ]