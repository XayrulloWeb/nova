const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const awardsUz = JSON.stringify([
    { title: "Xalq Ta'limi a'lochisi", desc: "Ta'lim sohasidagi ko'p yillik mehnatlari uchun", year: "2015" },
    { title: "Mehnat shuhrati ordeni", desc: "Davlat mukofoti", year: "2020" }
  ]);

  const awardsRu = JSON.stringify([
    { title: "Отличник народного образования", desc: "За многолетний труд в сфере образования", year: "2015" },
    { title: "Орден Трудовой Славы", desc: "Государственная награда", year: "2020" }
  ]);

  const bioUz = `Zulfiya Abdullayevna – 28 yillik tajribaga ega bo'lgan oliy toifali ustoz.
Ta'lim sohasida ko'plab yutuqlarga erishgan va yuzlab iqtidorli o'quvchilarni tarbiyalagan.
Nova AI School tashkilotchilaridan biri va maktab direktori lavozimida faoliyat yuritmoqda.`;

  const bioRu = `Зульфия Абдуллаевна — педагог высшей категории с 28-летним стажем работы.
Достигла множества успехов в сфере образования и воспитала сотни талантливых учеников.
Является одним из основателей Nova AI School и занимает должность директора школы.`;

  await prisma.administration.create({
    data: {
      name_uz: "Zulfiya Abdullayevna",
      name_ru: "Зульфия Абдуллаевна",
      role_uz: "Maktab Direktori",
      role_ru: "Директор школы",
      desc_uz: bioUz,
      desc_ru: bioRu,
      experience_years: "28",
      experience_period: "1996 - 2024",
      awards_uz: awardsUz,
      awards_ru: awardsRu,
      image_url: null
    }
  });

  console.log("Admin seeded successfully!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
