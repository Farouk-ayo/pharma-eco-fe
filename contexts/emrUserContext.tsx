"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axiosInstance from "@/services/axiosInstance";

interface EMRUser {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

interface EMRUserContextType {
  user: EMRUser | null;
  loading: boolean;
  setUser: (user: EMRUser | null) => void;
  logout: () => void;
}

const EMRUserContext = createContext<EMRUserContextType | undefined>(undefined);

export const EMRUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<EMRUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("emrAuthToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/emr/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response, "response");
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
        Cookies.remove("emrAuthToken");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    Cookies.remove("emrAuthToken");
    setUser(null);
    router.push("/pharmaeco-guard/auth/signin");
  };

  return (
    <EMRUserContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </EMRUserContext.Provider>
  );
};

export const useEMRUser = () => {
  const context = useContext(EMRUserContext);
  if (!context) {
    throw new Error("useEMRUser must be used within EMRUserProvider");
  }
  return context;
};
