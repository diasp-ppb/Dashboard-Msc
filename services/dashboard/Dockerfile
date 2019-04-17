FROM node:alpine

WORKDIR /usr/app

COPY . ./

RUN npm install
RUN npm install -g nodemon

EXPOSE 3000

CMD ["nodemon", "start"]