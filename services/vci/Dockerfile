FROM node:lts-jessie

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install nodemon globally
RUN npm i -g nodemon 

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN npm install


# Bundle app source
COPY . .

#exports
EXPOSE 3001 
