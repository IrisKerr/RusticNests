"use client";
import PageTitle from "@/app/components/page-title";
import { fetchMongoUser } from "@/helpers/fetch-user";
import dayjs from "dayjs";
import React, { useEffect } from "react";

function Account() {
  const [mongoUser, setMongoUser] = React.useState<{} | undefined>({});

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

  useEffect(() => {
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

    fetchUserInfos();
  }, []);

  return (
    <div>
      <PageTitle title="My Account" />
      <div className="flex flex-col gap-5">
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
      </div>
    </div>
  );
}

export default Account;
