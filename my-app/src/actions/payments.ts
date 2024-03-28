"use server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getStripeClientSecretKey = async (amount: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "eur",
      description: "Payment for RusticNests",
    });
    // return client secret key
    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error: any) {
    return { error: error.message };
  }
};
