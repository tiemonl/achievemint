FROM node:18-alpine AS build

WORKDIR /app

COPY *json *ts *js ./
COPY src ./src/
RUN <<-EOF
  npm install
  npm run build
  npm prune --omit=dev
EOF

FROM node:18-alpine AS final
COPY --from=build /app /app
WORKDIR /app

EXPOSE 3471
ENV PORT=3471

CMD npm run prod