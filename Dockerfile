FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

# Установите ts-node глобально
RUN npm install -g ts-node

EXPOSE 3000

# Запускайте сервер с помощью ts-node
# CMD ["ts-node", "src/server.ts"]
CMD ["nodemon", "--exec", "ts-node", "src/server.ts"]