"use server";

import { prisma } from "@/lib/db";

export async function dbUser(email) {
  console.log("dbUser");

  const dbUser = await prisma.user.findFirst({
    where: { email: email },
  });
  console.log("dbUser found user", dbUser);
  return dbUser;
}

export async function createUser(email) {
  console.log("createUser", email);

  const user = await prisma.user.create({
    data: {
      email: email,
      name: email,
      image: await getRandomAvatar(),
    },
  });

  console.log("dbUser found user", dbUser);
  return dbUser;
}

export async function getRandomAvatar() {
  const avatars = [
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=4",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=6",
    "https://i.pravatar.cc/150?img=7",
    "https://i.pravatar.cc/150?img=8",
    "https://i.pravatar.cc/150?img=9",
    "https://i.pravatar.cc/150?img=10",
    "https://i.pravatar.cc/150?img=11",
    "https://i.pravatar.cc/150?img=12",
  ];

  // Gerar um índice aleatório com base no tamanho do array de avatares
  const randomIndex = Math.floor(Math.random() * avatars.length);

  // Retornar a URL do avatar selecionado aleatoriamente
  return avatars[randomIndex];
}
