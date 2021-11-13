FROM node:16-alpine
LABEL maintainer="jorge.barnaby@gmail.com"

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install --immutable \
    && yarn cache clean

COPY . ./

ENV NODE_ENV production

CMD ["yarn", "start"]
