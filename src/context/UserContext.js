"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { LogoutAPI, getUserDataAPI } from "@/axios";
import { showErrorToast } from "@/utils/toast";

export const getUserData = async () => {
  try {
    const res = await getUserDataAPI();
    if (res.status === 200) return res.data;
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

  // useEffect(() => {
  //   checkSignedIn();
  // }, []);

  const checkout = () =>
    setSignedIn({ status: false, data: null, fetched: false });

  const router = useRouter();
  const showLogin = () => {
    showErrorToast(
      "You must be logged in to perform this operation. Please login and try again!"
    );
    router.push("/auth/login");
  };

  const handleLogout = async () => {
    if (typeof window === "undefined") return;
    try {
      const res = await LogoutAPI();
      if (res.status === 200) {
        router.push("/login");
      } else {
        throw new Error(res.data.error || "Logout Error");
      }
    } catch (err) {
      console.log(err);
      showErrorToast(
        err.message || "Something went wrong while trying to logout"
      );
    }
  };

  return (
    <UserContext.Provider
      value={{ signedIn, checkSignedIn, checkout, showLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
