FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g nodemon ts-node typescript
EXPOSE 3000
CMD ["npx", "nodemon", "--exec", "ts-node", "./src/app.ts"]