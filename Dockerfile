FROM node:20

WORKDIR /app

RUN yarn global add http-server concurrently

COPY ./entrypoint.sh /app/entrypoint.sh

COPY ./backend/package.json ./backend/yarn.lock  /app/backend/
COPY ./frontend/package.json ./frontend/yarn.lock /app/frontend/

WORKDIR /app/backend
RUN yarn install

WORKDIR /app/frontend
RUN yarn install

WORKDIR /app/backend
COPY ./backend /app/backend/
RUN NODE_ENV=production yarn build

WORKDIR /app/frontend
COPY ./frontend /app/frontend/
RUN API_BASE_URL=ENV_API_BASE_URL yarn generate

WORKDIR /app
ENTRYPOINT /app/entrypoint.sh