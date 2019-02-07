# 1/2 Create build image
FROM geodatagouv/node-gdal:10 AS build

RUN mkdir -p /opt/transcoder
WORKDIR /opt/transcoder

COPY package.json yarn.lock ./
RUN yarn --production --frozen-lockfile

# 2/2 Create production image
FROM geodatagouv/node-gdal:10
ARG SOURCE_COMMIT=unknown

RUN mkdir -p /opt/transcoder
WORKDIR /opt/transcoder

COPY --from=build /opt/transcoder .
COPY . .

ENV NODE_ENV=production \
    SENTRY_DSN_FILE=sentry_dsn \
    SENTRY_RELEASE=${SOURCE_COMMIT}

RUN mkdir -p /opt/bin
# COPY docker/scripts/entrypoint.sh /opt/bin/

EXPOSE 5003
# ENTRYPOINT ["/opt/bin/entrypoint.sh"]
CMD ["node", "server.js"]
