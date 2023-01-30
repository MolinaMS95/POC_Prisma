import prisma from "../src/database/db.js";

async function main() {
  await prisma.users.create({
    data: {
      name: "João",
      password: "senhalegal",
      phone: "12982461587",
    },
  });

  await prisma.rents.create({
    data: {
      user_id: 1,
      room: 2,
      startDate: new Date("2023-01-23"),
      endDate: new Date("2023-01-26"),
    },
  });

  await prisma.messages.create({
    data: {
      user_id: 1,
      message: "Olá, gostaria de alugar um quarto."
    }
  })
}

main()
  .then(() => {
    console.log("Registro feito com sucesso!");
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
