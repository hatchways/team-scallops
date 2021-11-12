FROM node:16.13-alpine3.13
EXPOSE 3001
ENV NODE_ENV=development
#Note, NODE_ENV must be set to development when building to include dev dependencies for linting purposes.
# NODE_ENV=production should also be set in a .env variable to enable express to statically route the /client/build folder.

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