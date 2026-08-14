const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrate() {
  console.log('Starting migration to JSONB...');

  // 1. News
  const allNews = await prisma.news.findMany();
  for (const news of allNews) {
    await prisma.news.update({
      where: { id: news.id },
      data: {
        title: { uz: news.title_uz, ru: news.title_ru },
        content: { uz: news.content_uz, ru: news.content_ru }
      }
    });
  }
  console.log(`Migrated ${allNews.length} news items.`);

  // 2. Administration
  const allAdmins = await prisma.administration.findMany();
  for (const admin of allAdmins) {
    await prisma.administration.update({
      where: { id: admin.id },
      data: {
        name: { uz: admin.name_uz, ru: admin.name_ru },
        role: { uz: admin.role_uz, ru: admin.role_ru },
        desc: { uz: admin.desc_uz || '', ru: admin.desc_ru || '' },
        awards: { uz: admin.awards_uz || '', ru: admin.awards_ru || '' }
      }
    });
  }
  console.log(`Migrated ${allAdmins.length} administration items.`);

  // 3. Teachers
  const allTeachers = await prisma.teachers.findMany();
  for (const teacher of allTeachers) {
    await prisma.teachers.update({
      where: { id: teacher.id },
      data: {
        name: { uz: teacher.name_uz, ru: teacher.name_ru },
        title: { uz: teacher.title_uz || '', ru: teacher.title_ru || '' },
        desc: { uz: teacher.desc_uz || '', ru: teacher.desc_ru || '' },
        tags: { uz: teacher.tags_uz || '', ru: teacher.tags_ru || '' },
        subject: { uz: teacher.subject_uz || '', ru: teacher.subject_ru || '' }
      }
    });
  }
  console.log(`Migrated ${allTeachers.length} teachers.`);

  console.log('Migration complete!');
  await prisma.$disconnect();
}

migrate().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
