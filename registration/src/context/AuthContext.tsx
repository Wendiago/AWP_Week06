import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import customAxios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TLoginSchema, TRegisterSchema } from "../types/type";
interface IUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

interface AuthContextType {
  user: IUser | null;
}

interface AuthContextType {
  user: IUser | null;
  register: (data: TRegisterSchema) => Promise<void>;
  login: (data: TLoginSchema) => Promise<void>;
  getUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {});

  const register = async (data: TRegisterSchema) => {
    const response = await customAxios.post("/user/register", data);
    console.log("Register: ", response);
    //localStorage.setItem("token", response.data.token);
  };

  const login = async (data: TLoginSchema) => {
    const response = await customAxios.post("/user/login", data);
    console.log("Login: ", response);
    //localStorage.setItem("token", response.data.token);
  };

  const getUser = async () => {
    const response = await customAxios.get("/user/info");
    console.log("Info: ", response);
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, getUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
