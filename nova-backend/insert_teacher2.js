const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  await prisma.teachers.create({
    data: {
      name: { uz: "Raxmonberganov Xayrullo", ru: "Рахмонберганов Хайрулло" },
      title: { uz: "Veb dasturlash va dasturlash o‘qituvchisi", ru: "Преподаватель веб-разработки и программирования" },
      subject: { uz: "Kompyuter savodxonligi o‘qituvchisi", ru: "Преподаватель компьютерной грамотности" },
      desc: { 
        uz: "Frontend va FullStack dasturlash sohasida 2 yillik tajriba.", 
        ru: "2 года опыта в области Frontend и FullStack-разработки."
      },
      tags: { uz: "2 yillik tajriba", ru: "2 года опыта" },
      image_url: "/uploads/xayrullo.png"
    }
  });
  console.log('Teacher inserted');
  process.exit(0);
}
run();
