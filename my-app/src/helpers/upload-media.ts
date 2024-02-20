import firebaseApp from "@/app/config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const UploadfilesToFirebaseAndReturnUrls = async (files: []) => {
  try {
    const storage = getStorage(firebaseApp);
    // upload files + get response
    const UploadfilesResponses = await Promise.all(
      files.map((file: any) => {
        const storageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(storageRef, file);
      })
    );
    // using response to get the downloaded urls
    const UploadfilesDownloadUrls = await Promise.all(
      UploadfilesResponses.map((res) => {
        return getDownloadURL(res.ref);
      })
    );
    return UploadfilesDownloadUrls;
  } catch (error: any) {
    throw new Error();
  }
};
