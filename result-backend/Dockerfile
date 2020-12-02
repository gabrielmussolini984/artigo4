FROM node:14-alpine

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD [ "npm", "start" ]