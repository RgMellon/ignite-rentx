import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

type User = {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
};

type AuthState = {
  token: string;
  user: User;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post("sessions", {
      email,
      password,
    });

    const { user, token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { useAuth, AuthProvider };
