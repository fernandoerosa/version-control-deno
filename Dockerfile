FROM denoland/deno:alpine-1.42.3

WORKDIR /app

COPY deps.ts .

RUN deno cache deps.ts

COPY . .

EXPOSE 8201

CMD ["run", "--allow-net", "main.ts"]
