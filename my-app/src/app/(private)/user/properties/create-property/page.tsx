"use client";
import PageTitle from "@/app/components/page-title";
import React, { useEffect } from "react";
import PropertiesForm from "../_components/properties-form";
import { findPropertyById, propertiesCountByUser } from "@/actions/properties";
import { getUserSubscription } from "@/actions/subscriptions";
import { fetchMongoUser } from "@/helpers/fetch-user";
import { Button } from "antd";
import { useRouter } from "next/navigation";

async function CreatePropertyPage({ searchParams }: { searchParams: any }) {
  const clonedPropertyId = searchParams?.cloneFrom || "";
  const router = useRouter();
  const [showForm, setShowForm] = React.useState<boolean>(true);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const [userSubscription, setUserSubscription] = React.useState<any>(null);
  const [propertiesCount, setPropertiesCount] = React.useState<number | null>(
    0
  );
  const [mongoUser, setMongoUser] = React.useState<{} | undefined>({});

  let property: any = {};
  if (clonedPropertyId) {
    property = await findPropertyById(clonedPropertyId);
  }

  const fetchUserPropertiesCount = async (userId: string) => {
    try {
      const properties = await propertiesCountByUser(userId);
      setPropertiesCount(properties);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
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

  const fetchUserSubscription = async (userId: string) => {
    try {
      const result = await getUserSubscription(userId);
      console.log(result);
      setUserSubscription(result?.subscription);
    } catch (error) {
      console.error("Error fetching user subscription:", error);
    }
  };

  useEffect(() => {
    setUserSubscription(null);
    setMongoUser(null);
    fetchUserInfos();
  }, []);

  useEffect(() => {
    if (mongoUser) {
      fetchUserPropertiesCount(mongoUser.id);
      fetchUserSubscription(mongoUser.id);
    }
  }, [mongoUser]);

  useEffect(() => {
    console.log(userSubscription);
    console.log(propertiesCount);
    console.log(userSubscription?.plan?.propertiesLimit);
    console.log(typeof userSubscription?.plan?.propertiesLimit);
    if (!userSubscription && propertiesCount! >= 3) {
      setShowForm(false);
      setErrorMessage(
        `You have reached the maximum number of properties with ${propertiesCount} properties created, please upgrade your subscription to add more properties.`
      );
    } else if (userSubscription?.plan?.propertiesLimit <= propertiesCount!) {
      setShowForm(false);
      setErrorMessage(
        `You have reached the maximum number of properties with ${propertiesCount} properties created, please upgrade your subscription to add more properties.`
      );
    }
  }, [userSubscription, propertiesCount]);

  return (
    <div>
      <PageTitle title="Create Property" />
      {showForm ? (
        <PropertiesForm initialValues={property ? property : {}} />
      ) : (
        <div className="text-sm">
          <p>{errorMessage}</p>
          <div className="flex gap-3">
            <Button
              className="md:max-w-[200px] inline-block my-5"
              onClick={() => router.push("/user/subscriptions")}
            >
              Upgrade subscription
            </Button>
            <Button
              type="primary"
              className="md:max-w-[200px] inline-block my-5"
              onClick={() => router.push("/user/properties")}
            >
              Go back to properties
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePropertyPage;
