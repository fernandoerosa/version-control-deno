FROM denoland/deno:alpine-1.42.3

WORKDIR /app

COPY deps.ts .

RUN deno cache deps.ts

COPY . .

EXPOSE 3000

ENTRYPOINT [ "sh", "docker/entrypoint.sh" ]