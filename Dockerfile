FROM node:6.9.3-alpine

# build packages first
ADD package.json /tmp/package.json
RUN cd /tmp && npm install -q
RUN npm install -g gulp -q
RUN npm install -g bower -q
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

# copy source
WORKDIR /opt/app
ADD . /opt/app
RUN bower install --allow-root
RUN gulp build

EXPOSE 3000
CMD ["npm", "start"]

