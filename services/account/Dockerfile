FROM node:20
RUN apt-get update && apt-get install -y \
    build-essential

ARG JWT_SECRET_KEY=jwt_secret_key
ARG SERVICE_PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV JWT_SECRET_KEY=$JWT_SECRET_KEY
ENV PORT=$SERVICE_PORT

EXPOSE $SERVICE_PORT
CMD ["node", "index.js"]
