"use client";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { getCurrentUserFromMongoDB } from "@/actions/users";
import { message } from "antd";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import Loader from "../components/Loader";
import { userMenu, adminMenu } from "@/roles.ts/roles";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [currentUserData, setCurrentUserData] = React.useState<User | null>(
    null
  );
  const [isLoading, setisLoading] = React.useState<boolean>(false);
  const [menuToShow, setmenuToShow] = React.useState<any>(null);

  const pathname = usePathname();
  const isPublicRoute = ["sign-in", "sign-up"].includes(pathname.split("/")[1]);
  const isAdminRoute = pathname.split("/")[1] === "admin";

  const getCurrentUser = () => {
    setisLoading(true);
    getCurrentUserFromMongoDB()
      .then((response: any) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        setCurrentUserData(response.data);
        if (response.data.isAdmin === true) {
          setmenuToShow(adminMenu);
        } else {
          setmenuToShow(userMenu);
        }
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    getCurrentUser();
  }, [isPublicRoute, isAdminRoute]);

  if (isLoading) {
    return <Loader />;
  }

  // isPublicRoute => sign-in & sign-up : permet de rendre le formulaire de connexion
  if (isPublicRoute) {
    return <div>{children}</div>;
  }

  if (isAdminRoute && !currentUserData?.isAdmin) {
    return (
      <div className="lg:px-20 px-5">
        <Header currentUserData={currentUserData} menuToShow={menuToShow} />
        <div className="py-5 lg:px-20 px-5 text-center text-gray-600">
          You are not authorized to access this page.
        </div>
      </div>
    );
  }

  return (
    <div className="lg:px-20 px-5">
      <Header currentUserData={currentUserData} menuToShow={menuToShow} />
      <div className="py-5">{children}</div>
    </div>
  );
}

export default LayoutProvider;
