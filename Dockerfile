FROM node:22-alpine

RUN npm install -g http-server

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

COPY . .

RUN npm install
RUN npm run generate

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["http-server", ".output/public", "-p", "3000", "-a", "0.0.0.0"]
