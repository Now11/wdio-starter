FROM node:12.8.0-alpine

WORKDIR /usr/automation

COPY ./ ./

RUN npm install

CMD ["npm", "run", "test:ci"]