"use client";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getStripeClientSecretKey } from "@/actions/payments";
import CheckoutForm from "./checkout-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function BuySubscriptions({
  plan,
  isSelected,
}: {
  plan: any;
  isSelected: boolean;
}) {
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showCheckoutForm, setShowCheckoutForm] =
    React.useState<boolean>(false);

  const getClientSecret = async () => {
    try {
      setLoading(true);
      const response = await getStripeClientSecretKey(plan.price);
      if (response.error) throw new Error(response.error);
      setClientSecret(response.clientSecret);
      setShowCheckoutForm(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {plan.price === 0 ? (
        <></>
      ) : (
        <Button
          block
          disabled={isSelected}
          onClick={getClientSecret}
          loading={loading}
        >
          {isSelected ? "Already purchased" : "Buy Subscription"}
        </Button>
      )}

      {clientSecret && showCheckoutForm && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          <CheckoutForm
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
            plan={plan}
          />
        </Elements>
      )}
    </>
  );
}

export default BuySubscriptions;
