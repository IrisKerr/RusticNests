"use server";

import prisma from "@/app/config/db";
import { getCurrentUserFromMongoDB } from "./users";

export const saveSubscription = async ({
  paymentId,
  plan,
}: {
  paymentId: string;
  plan: any;
}) => {
  try {
    const user: any = await getCurrentUserFromMongoDB();
    const userId = user?.data?.id;
    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId: userId },
    });
    // If an existing subscription is found, delete it
    if (existingSubscription) {
      await prisma.subscription.delete({
        where: { id: existingSubscription.id },
      });
    }
    // then, save the new subscription
    const payload: any = { paymentId, plan, userId: userId };
    await prisma.subscription.create({
      data: payload,
    });
    return {
      message: "Subscription saved successfully",
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getUserSubscription = async (mongoUserId: string) => {
  try {
    const subscription = await prisma.subscription.findFirst({
      where: { userId: mongoUserId },
    });
    return { subscription };
  } catch (error: any) {
    return { error: error.message };
  }
};
