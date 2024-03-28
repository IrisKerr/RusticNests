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
    const payload: any = { paymentId, plan, userId: user?.data?.id };
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
