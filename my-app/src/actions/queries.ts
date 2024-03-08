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

export const getUserQueries = async () => {
  try {
    const user = await getCurrentUserFromMongoDB();
    const userId = user?.data?.id;
    const queries = await prisma.query.findMany({
      where: {
        userId: userId,
      },
      include: {
        property: true,
      },
    });
    return {
      queries,
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getQueriesByPropertyId = async (propertyId: string) => {
  try {
    const queries = await prisma.query.findMany({
      where: {
        propertyId: propertyId,
      },
      include: {
        user: true,
      },
    });
    return {
      success: true,
      data: queries,
    };
  } catch (error: any) {
    return { error: error.message };
  }
};
