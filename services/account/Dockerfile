FROM node:20
RUN apt-get update && apt-get install -y \
    build-essential

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV JWT_SECRET_KEY jwt_secret_key
ENV PORT 3000

EXPOSE 3000
CMD ["node", "index.js"]

