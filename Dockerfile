FROM node:6.9.3-alpine

# build packages first
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN npm install -g gulp
RUN npm install -g bower
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

# copy source
WORKDIR /opt/app
ADD . /opt/app
RUN gulp build
RUN bower install

EXPOSE 3000
CMD ["npm", "start"]

