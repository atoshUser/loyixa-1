import { useAuth } from "@/hooks/useAuth";
import { User } from "firebase/auth";
import { ReactNode, createContext, useMemo } from "react";

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
  const { error, isLoading, user, signIn, signUp, logOut } = useAuth();

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
