const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  await prisma.teachers.create({
    data: {
      name: { uz: "Jonibek Uralov", ru: "Джонибек Уралов" },
      title: { uz: "Dasturlash yo'nalishi o'qituvchisi", ru: "Преподаватель направления программирования" },
      subject: { uz: "Dasturlash, Python, Django, Web-dasturlash va sun'iy intellekt (AI)", ru: "Программирование, Python, Django, Web-разработка и искусственный интеллект (AI)" },
      desc: { 
        uz: "Jonibek Uralov — IT va dasturlash sohasida faoliyat yurituvchi dasturchi va mentor. Python, Django, Web dasturlash hamda sun’iy intellekt texnologiyalari bo‘yicha amaliy tajribaga ega. O‘quvchilarga dasturlashni nafaqat nazariy, balki real loyihalar orqali o‘rgatishga alohida e’tibor beradi. Uning asosiy maqsadi — o‘quvchilarda dasturlashga qiziqish uyg‘otish, mantiqiy fikrlashni rivojlantirish va zamonaviy IT kasblariga tayyorlash.", 
        ru: "Джонибек Уралов — программист и ментор, работающий в сфере IT и программирования. Имеет практический опыт работы с технологиями Python, Django, Web-программирования и искусственного интеллекта. Особое внимание уделяет обучению студентов программированию не только через теорию, но и через реальные проекты. Его главная цель — пробудить в студентах интерес к программированию, развить логическое мышление и подготовить к современным IT-профессиям."
      },
      tags: { uz: "5 yil tajriba", ru: "5 лет опыта" },
      image_url: "/uploads/jonibek.png"
    }
  });
  console.log('Teacher inserted');
  process.exit(0);
}
run();
