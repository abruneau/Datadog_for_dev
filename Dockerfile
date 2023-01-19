FROM node:18

# Create app directory
WORKDIR /usr/src/app
RUN npm install dd-trace --save
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 3000
CMD [ "node", "--require", "dd-trace/init", "server.js" ]

