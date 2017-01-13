FROM node:6.9.3-alpine
WORKDIR /red-portal
ADD . /red-portal
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

