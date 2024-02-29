"use server";

import prisma from "@/app/config/db";
import { getCurrentUserFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";

export const addProperty = async (property: any) => {
  try {
    const user = await getCurrentUserFromMongoDB();

    const createdProperty = await prisma.property.create({
      data: {
        ...property,
        user: {
          connect: {
            id: user.data?.id,
          },
        },
      },
    });
    revalidatePath("/user/properties");
    return {
      data: createdProperty,
      message: "Property added successfully",
    };
  } catch (error: any) {
    console.error("An error occurred while adding the property:", error);
  }
};

export const findAllPropertiesFromUser = async (user: any) => {
  try {
    const properties = await prisma.property.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId: user?.data?.id,
      },
    });
    return {
      data: properties,
    };
  } catch (error: any) {
    console.error(
      "An error occurred while requesting the user's properties",
      error
    );
  }
};

export const findPropertyById = async (propertyId: string) => {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });
    return property;
  } catch (error: any) {
    console.error("An error occurred while requesting the properties", error);
  }
};

export const editProperty = async (property: any, id: string) => {
  try {
    await prisma.property.update({
      where: {
        id: id,
      },
      data: property,
    });
    revalidatePath("user/properties");
    return {
      data: property,
      message: "Property edited successfully!",
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteProperty = async (id: string) => {
  try {
    await prisma.property.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("user/properties");
    return {
      message: "Property deleted successfully!",
    };
  } catch (error: any) {
    return { error: error.message };
  }
};
