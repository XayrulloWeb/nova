const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function update() {
  await prisma.administration.updateMany({
    where: { name_ru: { contains: 'Зульфия' } },
    data: { image_url: '/uploads/zulfiya_new.png' }
  });
  console.log('Updated DB to zulfiya_new.png on server');
}
update();
