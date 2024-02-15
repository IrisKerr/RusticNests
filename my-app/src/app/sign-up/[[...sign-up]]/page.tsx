import { SignUp } from "@clerk/nextjs";

import BackgroundImage from "../../assets/pexels-eberhard-grossgasteiger-3389531.jpg";

export default function Page() {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SignUp />
    </div>
  );
}
