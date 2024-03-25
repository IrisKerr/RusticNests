"use client";
import { Button, message } from "antd";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getStripeClientSecretKey } from "@/actions/payments";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function BuySubscriptions({ plan }: { plan: any }) {
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const getClientSecret = async () => {
    try {
      setLoading(true);
      const response = await getStripeClientSecretKey(plan.price);
      if (response.error) throw new Error(response.error);
      setClientSecret(response.clientSecret);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        block
        disabled={plan.price === 0}
        onClick={getClientSecret}
        loading={loading}
      >
        Buy Subscription
      </Button>
    </>
  );
}

export default BuySubscriptions;
