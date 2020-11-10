FROM node:12.8.0-alpine

WORKDIR /usr/automation

COPY ./ ./

RUN npm install

RUN npm run build

CMD ["npm", "run", "test:ci"]