FROM node:14-alpine3.12

WORKDIR /app

COPY ./package.json /app/package.json

RUN npm install

RUN npm install -g nodemon

COPY ./src /app/src
COPY ./.env /app/.env
COPY ./index.js /app/index.js

ARG PORT
EXPOSE ${PORT}

CMD ["npm", "start"];
