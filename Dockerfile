FROM node:current

WORKDIR /app
COPY package*.json ./

RUN npm install -g pnpm && \
    pnpm i && \
    npx playwright install --with-deps && \
    mkdir -p /home/node/.cache/ms-playwright && \
    mv /root/.cache/ms-playwright /home/node/.cache/ && \
    chown -R node:node /home/node/.cache
COPY . .
RUN pnpm run build && chown node:node /app

EXPOSE ${PORT}

USER node
CMD [ "pnpm", "run", "start:prod" ]
