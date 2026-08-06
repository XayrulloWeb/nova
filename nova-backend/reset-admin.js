const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  let admin = await prisma.admins.findUnique({where: {username: 'admin'}});
  if (!admin) {
    const hash = await bcrypt.hash('admin123', 10);
    admin = await prisma.admins.create({data: {username: 'admin', password_hash: hash}});
    console.log('Admin created: admin / admin123');
  } else {
    const hash = await bcrypt.hash('admin123', 10);
    await prisma.admins.update({where: {username: 'admin'}, data: {password_hash: hash}});
    console.log('Admin password reset to: admin123');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
