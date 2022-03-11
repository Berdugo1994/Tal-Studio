FROM node:14.15
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8081 8080
CMD npm start