const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const t = await prisma.teachers.findMany({
    orderBy: { created_at: 'desc' },
    select: { id: true, name: true, created_at: true, image_url: true }
  });
  console.log(JSON.stringify(t, null, 2));
}

main().finally(() => prisma.$disconnect());
