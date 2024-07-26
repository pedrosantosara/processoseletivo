# Dockerfile for Angular Application
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Cria o build de produção do Angular
RUN npm run build

# Configura o Nginx para servir a aplicação Angular
FROM nginx:alpine

COPY --from=build /app/dist/items-page /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
