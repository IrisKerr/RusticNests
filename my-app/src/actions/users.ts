"use server";
import prisma from "@/app/config/db";
import { currentUser } from "@clerk/nextjs";

export const getCurrentUserFromMongoDB = async () => {
  try {
    // check if user is already in the db with clerkUserId property
    const clerkUser = await currentUser();

    let mongoUser = null;
    mongoUser = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser?.id },
    });
    if (mongoUser) {
      return {
        data: mongoUser,
      };
    }
    // if user doesn't exists, create a new user
    const username = clerkUser?.username
      ? clerkUser?.username
      : `${clerkUser?.firstName ?? ""}${
          clerkUser?.lastName ? `${clerkUser.lastName}` : ""
        }`;
    const newUser: any = {
      clerkUserId: clerkUser?.id,
      username,
      email: clerkUser?.emailAddresses[0].emailAddress,
      profilePic: clerkUser?.imageUrl,
    };
    const result = await prisma.user.create({
      data: newUser,
    });
    return {
      data: result,
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return {
      data: users,
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};
