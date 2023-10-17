import { auth } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

interface AuthContextState {
  user: User | null;
  isLoading: boolean;
  error: string;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({
  user: null,
  isLoading: false,
  error: "",

  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    error,
    isLoading,
    user,
    signIn,
    signUp,
    logOut,
    setUser,
    setLoading,
  } = useAuth();
  const [initialLoader, setInitialLoader] = useState<boolean>(true);
  const router = useRouter();

  const value = useMemo(
    () => ({
      error,
      isLoading,
      user,
      signIn,
      signUp,
      logOut,
    }),
    // eslint-disable-next-line
    [error, isLoading, user]
  );

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // Ro'yxatdan o'tgan

        setUser(user);
      } else {
        // Ro'yxatdan o'tmagan
        setUser(null);
      }
      setInitialLoader(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!initialLoader ? children : "Loader..."}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
