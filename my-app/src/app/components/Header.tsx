"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button, Dropdown } from "antd";
import { useRouter } from "next/navigation";
import logo from "../../../public/rustic-logo.png";
import Image from "next/image";

interface HeaderProps {
  currentUserData: any;
  menuToShow: any;
}

function Header({ currentUserData, menuToShow }: HeaderProps) {
  const router = useRouter();
  //   console.log(currentUserData);
  //   console.log(menuToShow);
  return (
    <div className="bg-header px-10 flex justify-between items-center rounded-b">
      <Image
        className="text-2xl text-white font-bold cursor-pointer"
        onClick={() => router.push("/")}
        src={logo}
        alt="logo"
        width={120} // Largeur de l'image
        height={120}
      />
      <div className="bg-white py-2 px-5 rounded-sm flex items-center gap-5 shadow-l">
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
            Menu
          </Button>
        </Dropdown>
        <UserButton afterSignOutUrl="/sign-in" signInUrl="/sign-in" />
      </div>
    </div>
  );
}

export default Header;
