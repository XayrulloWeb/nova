const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const students = await prisma.applications.findMany({ where: { status: 'STUDENT' }, include: { contract: true, payments: true } });
  console.log('Students:', students.length);
  process.exit(0);
}
run();
