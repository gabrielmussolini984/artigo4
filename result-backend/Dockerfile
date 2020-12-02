FROM node:14

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD [ "npm", "start" ]