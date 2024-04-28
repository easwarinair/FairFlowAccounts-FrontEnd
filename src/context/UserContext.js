"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { getUserData } from "./utils";
import { useRouter } from "next/navigation";
import { toastError } from "@/lib/toast";
import { getUserDataAPI } from "@/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState({
    status: false,
    data: null,
    fetched: false,
  });
  
  const checkSignedIn = async () => {
    const res = await getUserDataAPI();
    if (res) {
      setSignedIn({ status: true, data: res, fetched: true });
    } else {
      setSignedIn({ status: false, data: null, fetched: true });
    }
  };

  useEffect(() => {
    if (!signedIn.status) checkSignedIn();
  }, []);

  const checkout = () =>
    setSignedIn({ status: false, data: null, fetched: false });

  const router = useRouter();
  const showLogin = () => {
    toastError(
      "You must be logged in to perform this operation. Please login and try again!"
    );
    router.push("/auth/login");
  };

  return (
    <UserContext.Provider
      value={{ signedIn, checkSignedIn, checkout, showLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
