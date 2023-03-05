FROM node:current-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install -g pnpm && \
    pnpm i
COPY . .
RUN pnpm run build && chown node:node /app

EXPOSE ${PORT}

USER node
CMD [ "pnpm", "run", "start:prod" ]
