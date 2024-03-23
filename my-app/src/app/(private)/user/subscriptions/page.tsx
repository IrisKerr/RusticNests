import PageTitle from "@/app/components/page-title";
import React from "react";
import { subscriptionPlans } from "@/constants";
import BuySubscriptions from "./_components/buy-subscriptions";

function SubscriptionsPage() {
  return (
    <div>
      <PageTitle title="Subscriptions" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subscriptionPlans.map((plan, index) => {
          const isSelected = plan.name === "Free";
          return (
            <div
              key={index}
              className={`flex flex-col gap-5 justify-between p-5 border border-solid rounded border-gray-400 ${
                isSelected
                  ? "border-gray-800 shadow-xl bg-gray-100"
                  : "border-gray-300"
              }`}
            >
              <div>
                <h3 className="text-xl font-bold text-gray-600">{plan.name}</h3>
                <hr className="my-1 lg:my-2 border-gray-300" />
                <h4 className="text-orange-600 font-bold text-xl lg:text-3xl">
                  {plan.price} €
                </h4>
                <hr className="my-1 lg:my-2 border-gray-300" />
                <div className="flex flex-col gap-1">
                  {plan.features.map((feature, index) => (
                    <span key={index} className="text-gray-500 text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <BuySubscriptions plan={plan} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubscriptionsPage;
