FROM node:14.17.0-alpine

WORKDIR /app
RUN apk add git openssh && \
  mkdir -p ~/.ssh && \
  ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
COPY package*.json ./

RUN npm i -f
COPY . .
RUN npm run build && chown node:node /app

EXPOSE ${PORT}

USER node
CMD [ "npm", "run", "start:prod" ]
