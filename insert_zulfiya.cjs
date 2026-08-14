const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function insertZulfiya() {
  try {
    const admin = await prisma.administration.create({
      data: {
        name: { uz: 'Зульфия', ru: 'Зульфия' },
        role: { uz: 'Директор', ru: 'Директор' },
        desc: { 
          uz: 'Опытный руководитель и педагог. Вносит огромный вклад в развитие школы.', 
          ru: 'Опытный руководитель и педагог. Вносит огромный вклад в развитие школы.' 
        },
        awards: { uz: '', ru: '' },
        experience_years: '20',
        experience_period: '2004-2024',
        image_url: '/uploads/zulfiya_new.png'
      }
    });
    console.log('Inserted Zulfiya successfully:', admin);
  } catch (error) {
    console.error('Error inserting Zulfiya:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertZulfiya();
