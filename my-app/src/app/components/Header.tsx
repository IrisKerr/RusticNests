"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button, Dropdown } from "antd";
import { useRouter } from "next/navigation";

interface HeaderProps {
  currentUserData: any;
  menuToShow: any;
}

function Header({ currentUserData, menuToShow }: HeaderProps) {
  const router = useRouter();
  //   console.log(currentUserData);
  //   console.log(menuToShow);
  return (
    <div className="bg-primary p-2 flex justify-between items-center rounded-b">
      <h1
        className="text-2xl text-white font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        RusticNests
      </h1>
      <div className="bg-white py-2 px-5 rounded-sm flex items-center gap-5">
        <Dropdown
          menu={{
            items: menuToShow?.map((item: any) => ({
              label: item.name,
              onClick: () => {
                router.push(item.path);
              },
            })),
          }}
        >
          <Button type="link" className="text-primary">
            {currentUserData?.username}
          </Button>
        </Dropdown>
        <UserButton afterSignOutUrl="/sign-in" signInUrl="/sign-in" />
      </div>
    </div>
  );
}

export default Header;
