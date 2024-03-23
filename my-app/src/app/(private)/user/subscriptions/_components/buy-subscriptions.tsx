"use client";
import { Button } from "antd";
import React from "react";

function BuySubscriptions({ plan }: { plan: any }) {
  return (
    <>
      <Button block disabled={plan.price === 0}>
        Buy Subscription
      </Button>
    </>
  );
}

export default BuySubscriptions;
