# syntax=docker/dockerfile:1
# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.4.4-slim AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp
COPY package.json bun.lock /temp/
RUN --mount=type=cache,id=libroflare-bun,target=/root/.bun/install/cache \
    cd /temp && bun install --frozen-lockfile --ignore-scripts

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/node_modules node_modules
COPY . .

# build and compress
ENV NODE_ENV=production
RUN bun generate

# copy production dependencies and source code into final image
FROM nginx:1.31.8-alpine AS release
COPY --from=prerelease /usr/src/app/.output/public /usr/share/nginx/html

# run the app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
