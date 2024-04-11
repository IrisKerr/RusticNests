"use client";
import { propertiesCountByUser } from "@/actions/properties";
import {
  cancelSubscription,
  getUserSubscription,
} from "@/actions/subscriptions";
import PageTitle from "@/app/components/page-title";
import { fetchMongoUser } from "@/helpers/fetch-user";
import { Button, Modal, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";

function Account() {
  const [mongoUser, setMongoUser] = React.useState<{} | undefined>({});
  const [propertiesCount, setPropertiesCount] = React.useState<
    number | undefined
  >(0);
  const [userSubscription, setUserSubscription] =
    React.useState<any>(undefined);
  const [showQueryModal, setshowQueryModal] = React.useState(false);

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
      setUserSubscription(result?.subscription);
    } catch (error) {
      console.error("Error fetching user subscription:", error);
    }
  };

  const cancelUserSubscription = async (userId: string) => {
    try {
      const response = await cancelSubscription(userId);
      message.success(response?.message);
    } catch (error) {
      console.error("Error cancelling user subscription:", error);
    }
  };

  useEffect(() => {
    setUserSubscription(undefined);
    setMongoUser(undefined);
    fetchUserInfos();
  }, []);

  useEffect(() => {
    if (mongoUser) {
      fetchUserPropertiesCount(mongoUser.id);
      fetchUserSubscription(mongoUser.id);
    }
  }, [mongoUser]);

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
          <Button
            className="max-w-[200px] inline-block"
            onClick={() => setshowQueryModal(true)}
          >
            Cancel Subscription
          </Button>
          {showQueryModal && (
            <Modal onCancel={() => setshowQueryModal(false)} open footer={null}>
              <div className="text-sm">
                Are you sure to cancel your Subscription ?<br /> This is an
                irreversible operation.
              </div>
              <div className="mt-7 flex gap-3 justify-end">
                <Button
                  onClick={() => {
                    setshowQueryModal(false);
                    cancelUserSubscription(mongoUser?.userId);
                    setTimeout(() => {
                      setUserSubscription(null);
                    }, 2000);
                  }}
                >
                  Cancel My Subscription
                </Button>
                <Button type="primary" onClick={() => setshowQueryModal(false)}>
                  Close
                </Button>
              </div>
            </Modal>
          )}
        </div>
      ) : (
        <div className="text-sm mt-5 text-gray-700">
          No subscription found. You are on a free plan.
        </div>
      )}
    </div>
  );
}

export default Account;
