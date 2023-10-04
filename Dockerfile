FROM --platform=linux/amd64 node:14.17.6 as builder

WORKDIR /12-labours-app

COPY . .

RUN yarn install \
    --prefer-offline \
    --frozen-lockfile \
    --non-interactive \
    --production=false

RUN yarn build

RUN rm -rf node_modules && \
    NODE_ENV=production yarn install \
    --prefer-offline \
    --pure-lockfile \
    --non-interactive \
    --production=true

FROM --platform=linux/amd64 node:14.17.6

WORKDIR /12-labours-app

COPY --from=builder /12-labours-app .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]