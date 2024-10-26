FROM node:18-alpine

WORKDIR /app

COPY *json *ts *js .
COPY src src

# prune must be in the same command as install so that
# docker will treat it as the same layer
RUN <<-EOF
  npm install
  npm run build
  npm prune --omit=dev
EOF

EXPOSE 3471

ENV PORT=3471

CMD npm run prod