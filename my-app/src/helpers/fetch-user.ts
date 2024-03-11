import { getCurrentUserFromMongoDB } from "@/actions/users";
import { currentUser } from "@clerk/nextjs";

export const fetchMongoUser = async () => {
  try {
    const mongoDBUser = await getCurrentUserFromMongoDB();
    return mongoDBUser.data;
  } catch (error: any) {
    console.error("An error occurred while requesting the user's data", error);
  }
};

export const fetchClerkUser = async () => {
  try {
    const clerkUser = await currentUser();
    return clerkUser;
  } catch (error: any) {
    console.error("An error occurred while requesting the user's data", error);
  }
};
