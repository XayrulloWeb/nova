const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function check() {
  const admins = await prisma.administration.findMany();
  console.log(JSON.stringify(admins, null, 2));
}
check();
