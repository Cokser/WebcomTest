FROM node:latest

MAINTAINER Valeriy Khupeniya <thecokser@gmail.com>

RUN apt-get update && apt-get install -y openssh-server git

ENV ROOT_SSH_PASS="t3fD5lr8"
ENV NODE_SSH_PASS="se2Nd9Kr"

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

#install yarn and devDependencies
ENTRYPOINT exec /entrypoint.sh
