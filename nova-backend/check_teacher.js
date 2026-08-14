const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const t = await prisma.teachers.findFirst({ orderBy: { id: 'asc' } });
  console.log(JSON.stringify(t, null, 2));
  process.exit(0);
}
run();
