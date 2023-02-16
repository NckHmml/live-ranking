FROM node:19-alpine AS build-env
WORKDIR /app

COPY . ./
RUN npm ci
RUN npx tsc --build

FROM node:19-alpine
WORKDIR /app

COPY ./package-lock.json .
COPY ./package.json .
RUN npm ci --only=prod
COPY --from=build-env /app/bin .

ENTRYPOINT [ "node", "index.js" ]
