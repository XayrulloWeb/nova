const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function update() {
  await prisma.administration.updateMany({
    where: { name_ru: { contains: 'Зульфия' } },
    data: { image_url: '/uploads/zulfiya.png' }
  });
  console.log('Updated DB');
}
update();
