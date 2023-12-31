import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  signOut,
} from "firebase/auth";
import Cookies from "js-cookie";
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
        fetch("/api/customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: res.user.email,
            user_id: res.user.uid,
          }),
        });
        Cookies.set("user_id", res.user.uid);
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
        Cookies.set("user_id", res.user.uid);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // 3-) accountdan chiqib ketish

  const logOut = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => {
        setUser(null);
        Cookies.remove("user_id");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  return {
    error,
    isLoading,
    user,
    signIn,
    signUp,
    logOut,
    setUser,
    setLoading,
  };
};
