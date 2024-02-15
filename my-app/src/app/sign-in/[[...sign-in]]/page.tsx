import { SignIn } from "@clerk/nextjs";

import BackgroundImage from "../../assets/pexels-valeriia-miller-2527556.jpg";

export default function Page() {
  return (
    <>
      <div
        className="flex justify-center items-center h-screen"
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <SignIn />
      </div>
      ;
    </>
  );
}
