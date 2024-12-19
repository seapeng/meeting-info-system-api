FROM node:18.20.2-slim
ENV TZ="Asia/Phnom_Penh"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]