FROM node:19-alpine AS build-env
WORKDIR /app
ENV BABEL_ENV=development

COPY . ./
RUN cp ./.env.production ./.env
RUN npm ci
RUN npm run build
RUN npx babel -d ./bin -x .ts,.tsx ./src

FROM node:19-alpine
ENV NODE_PATH=bin/
WORKDIR /app

COPY ./package-lock.json .
COPY ./package.json .
RUN npm ci --only=prod
COPY --from=build-env /app/src ./bin
COPY --from=build-env /app/bin ./bin
COPY --from=build-env /app/build ./build

ENTRYPOINT [ "node", "./bin/server.js" ]