FROM node:18-alpine

WORKDIR /app

COPY *json *ts *js ./
COPY src ./src/
RUN <<-EOF
  npm install
  npm run build
  npm prune --omit=dev
  npm cache clean --force
EOF

EXPOSE 3471
ENV PORT=3471

CMD npm run prod