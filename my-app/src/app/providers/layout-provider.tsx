"use client";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { getCurrentUserFromMongoDB } from "@/actions/users";
import { message } from "antd";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import Loader from "../components/Loader";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [currentUserData, setCurrentUserData] = React.useState<User | null>(
    null
  );
  const [isLoading, setisLoading] = React.useState<boolean>(false);

  const pathname = usePathname();
  const isPublicRoute = ["sign-in", "sign-up"].includes(pathname.split("/")[1]);

  const getCurrentUser = () => {
    setisLoading(true);
    getCurrentUserFromMongoDB()
      .then((response: any) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        setCurrentUserData(response.data);
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    if (!isPublicRoute) getCurrentUser();
  }, [isPublicRoute]);

  return (
    <div>
      {isPublicRoute ? (
        <>
          {isLoading && <Loader />}
          {!isLoading && <div>{children}</div>}
        </>
      ) : (
        <div className="lg:px-20 px-5">
          <Header currentUserData={currentUserData} />
          {isLoading && <Loader />}
          {!isLoading && <div className="py-5">{children}</div>}
        </div>
      )}
    </div>
  );
}

export default LayoutProvider;
