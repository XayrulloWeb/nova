const fs = require('fs');
const envPath = '/home/ubuntu/nova/nova-backend/.env';
let e = fs.readFileSync(envPath, 'utf8');
e = e.replace(/TELEGRAM_BOT_TOKEN=.*/, 'TELEGRAM_BOT_TOKEN="8824917205:AAHrOi_YX_pm6tldthAeUevuYwe7xuFxtJU"');
fs.writeFileSync(envPath, e);
