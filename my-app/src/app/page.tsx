import { Button, Input } from "antd";
import { UserButton, currentUser } from "@clerk/nextjs";
import { getCurrentUserFromMongoDB } from "@/actions/users";

export default async function Home() {
  await getCurrentUserFromMongoDB();
  const loggedInUser = await currentUser();

  const username = loggedInUser?.username
    ? loggedInUser?.username
    : `${loggedInUser?.firstName ?? ""}${
        loggedInUser?.lastName ? `${loggedInUser.lastName}` : ""
      }`;

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 h-screen">
        <h1>RusticNests</h1>
        <Button type="primary">Primary Button</Button>
        <Button>default Button</Button>
        <UserButton afterSignOutUrl="/sign-in" signInUrl="/sign-in" />
        <span>User id : {loggedInUser?.id}</span>
        <span>Username : {username}</span>
        <span>Email : {loggedInUser?.emailAddresses[0].emailAddress}</span>
        <Input placeholder="basic usage" className="w-40"></Input>
      </div>
    </>
  );
}
