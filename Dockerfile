FROM node

WORKDIR /app

COPY ./package.json ./

RUN npm install --save

COPY . .

CMD ["npm","start"]