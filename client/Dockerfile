FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# Ensure Vite/React listens on all network interfaces
CMD ["npm", "run", "dev", "--", "--host"]