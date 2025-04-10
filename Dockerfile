FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json* ./

# Instala dependências
RUN npm ci

# Copia todo o projeto
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
