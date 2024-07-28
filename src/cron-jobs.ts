// src/cron-jobs.ts
import cron from 'node-cron';
import {prismaClient} from "./application/database";


cron.schedule('0 0 * * *', async () => { // Jalankan setiap hari
    const thresholdDate: Date = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - 1);

    const usersToDelete = await prismaClient.user.findMany({
        where: {
            is_verified: false,
            created_at: {
                lt: thresholdDate.toISOString()
            }
        }
    });

    if (usersToDelete.length > 0) {
        await prismaClient.user.deleteMany({
            where: {
                id: { in: usersToDelete.map(user => user.id) }
            }
        });
        console.log(`${usersToDelete.length} pengguna yang tidak terverifikasi telah dihapus.`);
    } else {
        console.log('Tidak ada pengguna yang tidak terverifikasi untuk dihapus.');
    }
});