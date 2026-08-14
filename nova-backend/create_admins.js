const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function run() {
  const superadminHash = await bcrypt.hash('nova_super_2024', 10);
  const adminHash = await bcrypt.hash('nova_admin_2024', 10);

  // Upsert superadmin
  await prisma.admins.upsert({
    where: { username: 'superadmin' },
    update: { password_hash: superadminHash, role: 'SUPERADMIN' },
    create: { username: 'superadmin', password_hash: superadminHash, role: 'SUPERADMIN' }
  });

  // Upsert admin
  await prisma.admins.upsert({
    where: { username: 'admin' },
    update: { password_hash: adminHash, role: 'ADMIN' },
    create: { username: 'admin', password_hash: adminHash, role: 'ADMIN' }
  });

  console.log('Created superadmin and admin accounts');
  process.exit(0);
}
run();
