#!/bin/bash

if [[ ! -f "/configurationComplete" ]];
then
	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

	apt-get update && apt-get install -y yarn \
										apt-transport-https \
										curl

	mkdir /usr/src/local

	cd /usr/src/local

	npm cache clean
	
	yarn init -y

	yarn add -D webpack \
	            webpack-dev-server\
				extract-text-webpack-plugin \
				html-webpack-plugin \
				webpack-merge \
				pug \
				pug-loader \
				uglifyjs-webpack-plugin \
				tinypng-webpack-plugin \
				postcss-loader \
				autoprefixer \
	            style-loader \
				file-loader \
	            css-loader \
	            sass-loader \
	            node-sass

	echo "root:$ROOT_SSH_PASS" | chpasswd
	echo "node:$NODE_SSH_PASS" | chpasswd


    touch /configurationComplete
fi

service ssh start
pwd && ls -la

echo "[hit enter key to exit] or run 'docker stop <container>'"
read _

echo "exited $0"
