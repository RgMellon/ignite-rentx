import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

import { database } from "../database";
import { User as ModelUser } from "../database/model/User";
import { catch } from "../../metro.config";

type User = {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  updateUser(user: User): Promise<void>
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>("users");

      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        //modificar para 0
        const userData = (response[0]._raw as unknown) as User;

        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
      }
    }

    loadUserData();
  }, []);

  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { user, token } = response.data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        await userCollection.create((newUser) => {
          (newUser.user_id = user.id), (newUser.name = user.name);
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          (newUser.avatar = user.avatar), (newUser.token = token);
        });
      });

      setData({ ...user, token });
    } catch (err) {
      console.log(err.response);
      throw new Error(err);
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>("users");

      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async function updateUser(user: User) { 
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.update((userData) => {
          userData.name = user.name,
          userData.driver_license = user.driver_license,
          userData.avatar = user.avatar
        })
      })

      setData(user)
    } catch (err) {
      throw new Error(err)
    }
  }
  

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
        updateUser
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
