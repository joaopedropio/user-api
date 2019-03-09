FROM node:8-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 80
ENTRYPOINT [ "npm", "start" ]
