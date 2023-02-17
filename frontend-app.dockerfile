FROM node:19-alpine AS build-env
WORKDIR /app

COPY . ./
RUN cp ./.env.production ./.env
RUN npm ci
RUN npm run build
RUN npx tsc --build tsconfig.server.json

FROM node:19-alpine
WORKDIR /app

COPY ./package-lock.json .
COPY ./package.json .
RUN npm ci --only=prod
COPY --from=build-env /app/src ./bin
COPY --from=build-env /app/bin ./bin
COPY --from=build-env /app/build ./build

ENTRYPOINT [ "node", "./bin/server.js" ]