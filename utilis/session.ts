"use server";
import { jwtVerify } from "jose";

const secret = process.env.TOKEN_SECRET!;
const encodedKey = new TextEncoder().encode(secret);

export async function decrypt(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, encodedKey);
    return payload;
  } catch {
    console.log("Failed to decrypt token");
  }
}
