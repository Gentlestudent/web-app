FROM node:14 AS build
WORKDIR /build
COPY package*.json ./
RUN npm i
COPY next.config.js ./next.config.js
COPY src ./src
COPY environments ./environments
RUN npm run build

FROM node:14-alpine AS release
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
WORKDIR /server
COPY package*.json ./
RUN npm i --only=prod
COPY --from=build /build/.next ./.next
CMD ["npm", "start"]
