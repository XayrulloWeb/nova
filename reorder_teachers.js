const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.teachers.update({ where: { id: 3 }, data: { created_at: new Date('2026-12-03T00:00:00Z') } });
  await prisma.teachers.update({ where: { id: 2 }, data: { created_at: new Date('2026-12-02T00:00:00Z') } });
  await prisma.teachers.update({ where: { id: 1 }, data: { created_at: new Date('2026-12-01T00:00:00Z') } });
  console.log('Reordered successfully');
}

main().finally(() => prisma.$disconnect());
