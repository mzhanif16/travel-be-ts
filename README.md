# Travel Backend Project


![Node.js](https://img.shields.io/badge/Node.js-%3E%3D14.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-%3E%3D4.0.0-blue)
![MIT License](https://img.shields.io/badge/License-MIT-brightgreen)

Ini adalah proyek backend untuk aplikasi travel yang mencakup fitur autentikasi pengguna dan pemesanan tiket. Proyek ini menggunakan Node.js dan Prisma sebagai ORM untuk mengelola database.

## Fitur

- **Autentikasi Pengguna**: Mengelola pendaftaran, login, dan manajemen akun pengguna.
- **Pemesanan Tiket**: Memungkinkan pengguna untuk memesan tiket perjalanan.

## Prerequisites

Sebelum memulai, pastikan Anda memiliki Node.js dan npm terinstal di sistem Anda.

## Setup Project

Ikuti langkah-langkah di bawah ini untuk menyiapkan dan menjalankan proyek:

1. **Clone Repository**

    ```bash
    git clone https://github.com/mzhanif16/travel-be-ts
    cd travel-be-ts
    ```

2. **Buat File `.env`**

   Salin file `.env.example` ke `.env` dan sesuaikan variabel-variabel berikut sesuai kebutuhan Anda:

    ```dotenv
    DATABASE_URL=your-database-url
    ```

3. **Instal Dependensi**

    ```bash
    npm install
    ```

4. **Jalankan Migrasi Prisma**

    ```bash
    npx prisma migrate dev
    ```

5. **Hasilkan Client Prisma**

    ```bash
    npx prisma generate
    ```

6. **Bangun Proyek**

    ```bash
    npm run build
    ```

7. **Jalankan Proyek**

    ```bash
    npm run start
    ```
   
## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan buka [issue](https://github.com/username/travel-backend/issues) atau ajukan pull request.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

