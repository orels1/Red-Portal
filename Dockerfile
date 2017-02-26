FROM node:6.9.3-alpine

# copy dependency jsons
ADD package.json /tmp/package.json
ADD bower.json /tmp/bower.json

# install tools
RUN npm install -g gulp bower -q

# install dependencies
RUN cd /tmp && npm install -q
RUN cd /tmp && bower install --allow-root
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app && cp -a /tmp/bower_components /opt/app

# copy source
WORKDIR /opt/app
ADD . /opt/app
RUN gulp build

EXPOSE 3000
CMD ["npm", "start"]

