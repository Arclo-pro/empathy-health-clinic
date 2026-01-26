FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:ci

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
