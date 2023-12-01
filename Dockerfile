FROM alpine:latest

LABEL org.opencontainers.image.authors="architect-team"
LABEL org.opencontainers.image.source="https://github.com/architect-team/s3cmd.git"
LABEL org.opencontainers.image.url="https://github.com/architect-team/s3cmd"

RUN apk upgrade --no-cache \
  && apk add --no-cache python3 py3-six py3-pip py3-setuptools libmagic git ca-certificates \
  && pip install s3cmd

ENTRYPOINT [ "s3cmd" ]
CMD ["--help"]