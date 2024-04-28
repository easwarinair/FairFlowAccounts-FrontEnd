"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { getUserDataAPI } from "@/axios";
import { showErrorToast } from "@/utils/toast";

export const getUserData = async () => {
  try {
    const res = await getUserDataAPI();
    if (res.status === 200) return res.data?.user;
    else return false;
  } catch (err) {
    return false;
  }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState({
    status: false,
    data: null,
    fetched: false,
  });

  const checkSignedIn = async () => {
    const res = await getUserData();
    if (res) setSignedIn({ status: true, data: res, fetched: true });
    else setSignedIn({ status: false, data: null, fetched: true });
  };

  useEffect(() => {
    if (!signedIn.status) checkSignedIn();
  }, []);

  const checkout = () =>
    setSignedIn({ status: false, data: null, fetched: false });

  const router = useRouter();
  const showLogin = () => {
    showErrorToast(
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
