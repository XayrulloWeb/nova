const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();
async function update() {
  await prisma.administration.updateMany({
    where: { name_ru: { contains: 'Зульфия' } },
    data: { image_url: '/uploads/zulfiya.jpg' }
  });
  console.log('Updated DB to jpg');
}
update();
