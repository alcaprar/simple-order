FROM node:20 as frontend-builder

WORKDIR /home/app

RUN yarn config set network-timeout 300000

COPY ./frontend/package.json ./frontend/yarn.lock /home/app/frontend/

WORKDIR /home/app/frontend
RUN NODE_ENV=production yarn install

COPY ./frontend /home/app/frontend/
RUN yarn build


FROM node:20

WORKDIR /home/app

RUN yarn config set network-timeout 300000

RUN yarn global add concurrently

COPY ./backend/package.json ./backend/yarn.lock  /home/app/backend/

WORKDIR /home/app/backend
RUN NODE_ENV=production yarn install

WORKDIR /home/app/backend
COPY ./backend /home/app/backend/
RUN NODE_ENV=production yarn build

COPY --from=frontend-builder /home/app/frontend/.output/server /home/app/frontend/.output/server 

COPY ./entrypoint.sh /home/app/entrypoint.sh

WORKDIR /app
ENTRYPOINT /home/app/entrypoint.sh