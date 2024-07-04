"use server";

import { z } from "zod";
import { UserSchema } from "@/lib/schema";
import prisma from "@/lib/prisma";
import axios, { Axios } from "axios";

type Inputs = z.infer<typeof UserSchema>;

export async function addEntry(data: Inputs) {
  const result = UserSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.format() };
  }
  /* await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
    },
  }); */
  await axios.post("/api/users", data);

  return { success: true, data: result.data };
}