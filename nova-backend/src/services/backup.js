const cron = require('node-cron');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { sendDocument } = require('./telegram');

const backupDatabase = async () => {
  console.log('[Backup] Starting database backup...');
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('[Backup] No DATABASE_URL found. Skipping.');
    return;
  }

  const dateStr = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0];
  const fileName = `backup_${dateStr}.sql`;
  const filePath = path.join(__dirname, '..', '..', fileName);

  // We are using pg_dump directly. Make sure pg_dump is in your system PATH.
  // We don't zip it directly with pipes because Windows/Linux pipe handling varies.
  // Instead, we just dump it to a file. For smaller DBs, unzipped sql is fine, or we can zip it with zlib in JS if needed.
  
  const command = `pg_dump "${dbUrl}" > "${filePath}"`;

  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error('[Backup] Failed to create backup:', error);
      console.error(stderr);
      return;
    }
    
    console.log(`[Backup] Backup created successfully: ${fileName}`);
    
    try {
      await sendDocument(filePath, `📦 Ежедневный бэкап базы данных Nova School\n📅 Дата: ${dateStr}`);
      console.log('[Backup] Backup sent to Telegram.');
    } catch (sendError) {
      console.error('[Backup] Failed to send backup to Telegram:', sendError);
    } finally {
      // Clean up the file so we don't eat disk space
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('[Backup] Local backup file deleted.');
      }
    }
  });
};

const initBackupService = () => {
  // Schedule to run every day at 03:00 AM
  cron.schedule('0 3 * * *', () => {
    backupDatabase();
  });
  console.log('[Backup] Service initialized. Scheduled for 03:00 AM daily.');
};

module.exports = {
  initBackupService,
  backupDatabase // Exporting for manual testing
};
