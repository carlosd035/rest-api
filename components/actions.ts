"use server";

import { z } from "zod";
import { UserSchema } from "@/lib/schema";
import prisma from "@/lib/prisma";
import axios, { Axios } from "axios";

type Inputs = z.infer<typeof UserSchema>;


// O actions.ts é recente, eles são uma forma de fazer chamadas para a API mas com o próprio prisma
// Mas a forma mais fácil e organizada na minha opinião é usar o axios e a api nas pastas direitinhas
export async function addEntry(data: Inputs) {
  const result = UserSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.format() };
  }

  // como tens acesso ao prisma, podes fazer o create aqui
  await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
    },
  });

  // esse código daqui foi eu tentando fazer o POST com axios, caso queira ver as msgs de erro é so descomentar e ver no console do server side

  // axios.post("/api/users", {
  //   email: data.email,
  //   password: data.password,
  //   name: data.name,
  // }).then((res) => {
  //   console.log(res);
  // }
  // ).catch((error) => {
  //   console.log(error);
  // });

  // fetch("localhost:3000/api/users", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  return { success: true, data: result.data };
}
