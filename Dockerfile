FROM node:22-alpine AS angular

WORKDIR /app

# Copia package.json E package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build -- --configuration production

# --- ETAPA NGINX ---
FROM nginx:alpine

# Ajuste a origem do nginx.conf conforme onde salvou no seu projeto
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# Ajuste o caminho da pasta compilada
COPY --from=angular /app/dist/angular-project/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# docker build -t angular-project . //executa
# docker run -d -p port:80 --angular app-angular angular-project
