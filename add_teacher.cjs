const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const teacher = await prisma.teachers.create({
    data: {
      name: {
        uz: "Batirov O'ktamjon Ruslan o'g'li",
        ru: "Батиров Уктамжон Руслан оглы"
      },
      subject: {
        uz: "IT-mutaxassis",
        ru: "IT-специалист"
      },
      title: {
        uz: "Dasturchi va Mentor",
        ru: "Программист и Ментор"
      },
      desc: {
        uz: "JS Dasturchi (FULLSTACK): Vanilla JS, Node JS, Electron JS, React Native JS.\nOfis dasturlari va kompyuter savodxonligi mentori.\nGrafik dizayner: Adobe Photoshop / 3D Blender / CapCut.\nAI Surfer: Claude Code, ChatGPT, Gemini, SuperGrok.\n\nTajribasi - 8 yildan ortiq:\n• Urganch shahridagi 10-sonli davlat rus maktabida 7 yillik informatika fani o'qituvchisi.\n• Urganch shahridagi \"IT-PARK XORAZM\" markazida 2 yil.\n• 6 yillik IT-mutaxassis, JS dasturiy ta'minot ishlab chiquvchisi (Frilanser).",
        ru: "JS Программист (FULLSTACK): Vanilla JS, Node JS, Electron JS, React Native JS.\nМентор по офисным программам и ПК.\nГрафический дизайнер: Adobe Photoshop / 3D Blender / CapCut.\nAI Surfer: Claude Code, ChatGPT, Gemini, SuperGrok.\n\nОпыт работы - более 8 лет:\n• 7 лет Учитель Информатики в Государственной русской школе №10 города Ургенча.\n• 2 года в профессиональном технологическом учебном центре \"IT-PARK XORAZM\".\n• 6 лет IT-Specialist, JS разработчик программного обеспечения (Фриланс)."
      },
      tags: {
        uz: "IT-mutaxassis, Dasturchi, Mentor",
        ru: "IT-специалист, Программист, Ментор"
      },
      image_url: "/uploads/batirov_uktamjon.jpg"
    }
  });
  console.log("Teacher added:", teacher);
}

main().catch(console.error).finally(() => prisma.$disconnect());
