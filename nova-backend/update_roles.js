const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  await prisma.admins.updateMany({ data: { role: 'SUPERADMIN' } });
  console.log('All existing admins are now SUPERADMINs');
  process.exit(0);
}
run();
