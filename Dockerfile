FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3471

ENV PORT=3471

CMD npm run prod