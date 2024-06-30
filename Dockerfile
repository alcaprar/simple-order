FROM node:20

WORKDIR /home/app

RUN yarn global add concurrently

COPY ./backend/package.json ./backend/yarn.lock  /home/app/backend/
COPY ./frontend/package.json ./frontend/yarn.lock /home/app/frontend/

WORKDIR /home/app/backend
RUN yarn install

WORKDIR /home/app/frontend
RUN yarn install

WORKDIR /home/app/backend
COPY ./backend /home/app/backend/
RUN NODE_ENV=production yarn build

WORKDIR /home/app/frontend
COPY ./frontend /home/app/frontend/
RUN yarn build

COPY ./entrypoint.sh /home/app/entrypoint.sh

WORKDIR /app
ENTRYPOINT /home/app/entrypoint.sh