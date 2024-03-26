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
    const user = await getCurrentUserFromMongoDB();
    const payload: any = { paymentId, plan, UserId: user?.data?.id };
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
