"use client";
import { propertiesCountByUser } from "@/actions/properties";
import { getUserSubscription } from "@/actions/subscriptions";
import PageTitle from "@/app/components/page-title";
import { fetchMongoUser } from "@/helpers/fetch-user";
import dayjs from "dayjs";
import React, { useEffect } from "react";

function Account() {
  const [mongoUser, setMongoUser] = React.useState<{} | undefined>({});
  const [propertiesCount, setPropertiesCount] = React.useState<
    number | undefined
  >(0);
  const [userSubscription, setUserSubscription] =
    React.useState<any>(undefined);

  const getSectionTitle = (title: string) => {
    return (
      <div>
        <h3 className="font-bold text-gray-700">{title}</h3>
        <hr className="border-solid border-gray-300 my-2" />
      </div>
    );
  };

  const getAttribute = (title: string, value: string) => {
    return (
      <div className="flex flex-col text-sm mt-2">
        <span className="text-gray-900 font-semibold">{title}</span>
        <span className="text-gray-700 font-light">{value}</span>
      </div>
    );
  };

  const fetchUserInfos = async () => {
    try {
      const mongoUser = await fetchMongoUser();
      if (mongoUser !== undefined) {
        setMongoUser(mongoUser);
      }
      console.log(mongoUser);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const fetchUserPropertiesCount = async (userId: string) => {
    try {
      const properties = await propertiesCountByUser(userId);
      setPropertiesCount(properties);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const fetchUserSubscription = async (userId: string) => {
    try {
      const result = await getUserSubscription(userId);
      console.log(result.subscription);
      setUserSubscription(result.subscription);
    } catch (error) {
      console.error("Error fetching user subscription:", error);
    }
  };
  useEffect(() => {
    fetchUserInfos();
    if (mongoUser) {
      fetchUserPropertiesCount(mongoUser?.id);
      fetchUserSubscription(mongoUser?.id);
    }
  }, []);

  return (
    <div>
      <PageTitle title="My Account" />
      <div className="flex flex-col gap-5 mt-3">
        {getSectionTitle("Basic Details")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>{getAttribute("user Name", mongoUser?.username || "")}</div>
        <div>{getAttribute("Email", mongoUser?.email || "")}</div>

        <div>
          {getAttribute(
            "Registered On",
            dayjs(mongoUser?.createdAt).format("DD/MM/YYYY hh:mm A") || ""
          )}
        </div>
        <div>
          {getAttribute("Properties Posted", propertiesCount?.toString() || 0)}
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        {getSectionTitle("Subscription Details")}
      </div>
      {userSubscription ? (
        <div className="grid cols-3 gap-5">
          {getAttribute("Plan", userSubscription?.plan?.name || "")}
          {getAttribute("Price", `${userSubscription?.plan?.price} €` || "")}
          {getAttribute(
            "Purchased on",
            dayjs(userSubscription?.createdAt).format("DD/MM/YYYY hh:mm A") ||
              ""
          )}
        </div>
      ) : (
        <div className="text-center">No subscription found</div>
      )}
    </div>
  );
}

export default Account;
