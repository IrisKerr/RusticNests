import React from "react";
import { UserButton } from "@clerk/nextjs";

interface HeaderProps {
  currentUserData: any;
}

function Header({ currentUserData }: HeaderProps) {
  return (
    <div className="bg-primary p-3 flex justify-between items-center rounded-b">
      <h1 className="text-2xl text-white font-bold">RusticNests</h1>
      <div className="bg-white py-2 px-5 rounded-sm flex items-center gap-5">
        <span>{currentUserData?.username}</span>
        <UserButton afterSignOutUrl="/sign-in" signInUrl="/sign-in" />
      </div>
    </div>
  );
}

export default Header;
