"use client";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { getCurrentUserFromMongoDB } from "@/actions/users";
import { message } from "antd";
import { User } from "@prisma/client";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [currentUserData, setCurrentUserData] = React.useState<User | null>(
    null
  );

  const getCurrentUser = () => {
    getCurrentUserFromMongoDB()
      .then((response: any) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        setCurrentUserData(response.data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="lg:px-20 px-5">
      <Header currentUserData={currentUserData} />
      <div className="py-5">{children}</div>
    </div>
  );
}

export default LayoutProvider;
