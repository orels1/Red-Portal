FROM node:7.10.0-alpine

# copy dependency jsons
ADD package.json /tmp/package.json

# install dependencies
RUN cd /tmp && npm install --silent
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

# copy source
WORKDIR /opt/app
ADD . /opt/app

EXPOSE 3000
CMD ["npm", "start"]

