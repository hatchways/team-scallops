FROM node:16.13-alpine3.13
EXPOSE 3001
ENV NODE_ENV=production

WORKDIR /app

COPY /server/package.json ./
COPY /server/package-lock.json ./

RUN npm ci
COPY /server/ .

WORKDIR /app/client/

COPY /client/package.json ./
COPY /client/package-lock.json ./ 
RUN ls 
RUN npm ci
COPY /client/ ./
RUN npm run build --if-present
COPY /client/ ./

WORKDIR /app

RUN ls
CMD ["node", "./bin/www"]