FROM oven/bun as builder

LABEL org.opencontainers.image.authors="architect-team"
LABEL org.opencontainers.image.source="https://github.com/architect-team/s3cmd.git"
LABEL org.opencontainers.image.url="https://github.com/architect-team/s3cmd"

COPY ./entrypoint .

RUN bun build ./index.ts --compile --outfile ./docker-entrypoint

RUN apt-get update \
  && apt-get install -y python3.6 pip \
  && pip install s3cmd

COPY .s3cfg .s3cfg
