FROM node:lts-alpine

WORKDIR /usr/automation

COPY ./ ./

RUN npm install

CMD ["npm", "run", "test:ci"]