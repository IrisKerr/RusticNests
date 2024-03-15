import PageTitle from "@/app/components/page-title";
import React from "react";
import { subscriptionPlans } from "@/constants";
import { Button } from "antd";

function SubscriptionsPage() {
  return (
    <div>
      <PageTitle title="Subscriptions" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subscriptionPlans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 justify-center p-5 border border-solid rounded border-gray-400"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-600">{plan.name}</h3>
              <hr className="my-2 border-gray-300" />
              <h4 className="text-orange-600 font-bold text-2xl lg:text-3xl">
                {plan.price} €
              </h4>
            </div>
            <Button>Buy Now</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionsPage;
