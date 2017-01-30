FROM node:6.9.3-alpine

# build packages first
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN npm install gulp -g
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

# copy source
WORKDIR /opt/app
ADD . /opt/app
RUN gulp build

EXPOSE 3000
CMD ["npm", "start"]

