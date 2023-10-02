FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY *.config.js ./

RUN npm install
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 8081
CMD [ "npm", "run", "start" ]
