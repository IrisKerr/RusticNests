"use server";
import prisma from "@/app/config/db";
import { getCurrentUserFromMongoDB } from "./users";

export const sendQuery = async (query: any) => {
  try {
    const user = await getCurrentUserFromMongoDB();
    query.userId = user?.data?.id;
    await prisma.query.create({
      data: query,
    });
    return {
      data: query,
      message: "Query send successfully !",
    };
  } catch (error: any) {
    return { error: error.message };
  }
};
