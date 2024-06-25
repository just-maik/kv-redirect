# BUILD PROJECT TO EXECUTABLE
FROM oven/bun:alpine as build-step

WORKDIR /app
COPY . /app

RUN bun install
RUN bun build:bun

# BUILD RUNTIME IMAGE
FROM oven/bun:alpine
RUN rm -rf ~/.bun 

WORKDIR /app

COPY --from=build-step /app/dist/* /app/

CMD [ "bun","index-bun.js" ]