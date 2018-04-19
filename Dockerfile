FROM node:6.9.3-alpine

# copy dependency jsons
ADD package.json /tmp/package.json
ADD bower.json /tmp/bower.json

# install tools
RUN npm install -g gulp bower --silent
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# install dependencies
RUN cd /tmp && npm install --silent
RUN cd /tmp && bower install --allow-root
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app && cp -a /tmp/bower_components /opt/app

# copy source
WORKDIR /opt/app
ADD . /opt/app
RUN gulp build
# jQuery fix
RUN cp /opt/app/bower_components/jquery/dist/jquery.min.js /opt/app/public/js

EXPOSE 3000
CMD ["npm", "start"]

