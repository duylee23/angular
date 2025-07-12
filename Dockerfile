FROM node:18-alpine AS builder

WORKDIR /app

COPY package-lock.json package.json ./
RUN npm install -g @angular/cli
RUN npm install --force
# RUN ng analytics off
COPY . .

EXPOSE 4200
ENV NG_CLI_ANALYTICS=ci
CMD ["ng", "serve", "--host", "0.0.0.0","--poll", "1000"]


