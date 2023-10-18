import { db } from "@/firebase";
import { IMyList } from "@/interface/movie.app";
import { collection, getDocs } from "firebase/firestore";

export const getList = async (userId: string) => {
  let myList: IMyList[] = [];
  const querySnapshot = await getDocs(collection(db, "list"));
  querySnapshot.forEach((doc) => {
    if (doc.data().userId == userId) {
      myList.push(doc.data() as IMyList);
    }
  });
  return myList;
};
