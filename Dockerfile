FROM node:14.7.0-alpine

WORKDIR /usr/src/app
COPY package.json .

# Install all Packages
RUN npm install

ADD . /usr/src/app

CMD [ "npm", "start" ]
EXPOSE 8080
