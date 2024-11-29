# Gunakan image resmi Node.js sebagai base image
FROM node:18-alpine

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependensi aplikasi
RUN npm install

# Salin seluruh file aplikasi ke dalam container
COPY . .

# Expose port aplikasi (misalnya port 3000)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]


# docker run -p 3000:3000 catloris1:1 (mejalankan apliaksi di dalam container doceker)
# menegecek status container (docker ps)
# setiap kali menjalankan docker containernya harus di hentikan juga (docker stop <nama_container>)
