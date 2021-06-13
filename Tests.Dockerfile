FROM node:lts-alpine

WORKDIR /usr/automation

COPY ./ ./

RUN npm install

#RUN npm run build

CMD ["npm", "run", "test:ci"]