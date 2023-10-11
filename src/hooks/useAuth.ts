import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useState } from "react";
import { useRouter } from "next/router";
export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  // 1-) emial va password orqali ro'yxatdan o'tish
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user), router.push("/");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // 2-) email va password orqali kirish
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user), router.push("/");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // 3-) accountdan chiqib ketish

  const logOut = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => setUser(null))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  return { error, isLoading, user, signIn, signUp, logOut };
};
