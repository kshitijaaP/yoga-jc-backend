FROM node

WORKDIR /app

COPY ./backend/backend/package.json ./

RUN npm install --save

COPY . .

CMD ["npm","start"]