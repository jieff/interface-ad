# Use a imagem oficial do Node.js 16 como base
FROM node:16

# Crie o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install --force

# Copie o restante dos arquivos da aplicação
COPY . .

# Execute o comando de construção do Next.js
RUN npm run build

# Expõe a porta que a aplicação utiliza
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
