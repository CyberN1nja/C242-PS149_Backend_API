FROM catloris1:1

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules

# Install dependencies
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# docker run -p 3000:3000 catloris1:1 (mejalankan apliaksi di dalam container doceker)
# menegecek status container (docker ps)
# setiap kali menjalankan docker containernya harus di hentikan juga (docker stop <nama_container>)
