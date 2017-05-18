FROM node:7
ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install -g nodemon

COPY ./package.json src/

WORKDIR src/

RUN npm install

COPY . /src

RUN npm run build

WORKDIR build/

CMD ["node", "server/index.js"]