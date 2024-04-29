"use client";

import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginButton = () => {
  const router = useRouter();
  const { signedIn, handleLogout, checkSignedIn } = useUserContext();

  useEffect(() => {
    checkSignedIn();
  }, []);

  return (
    <div className="login-button">
      {signedIn.status ? (
        <>
          <button onClick={() => router.push("/profile")}>
            {signedIn?.data?.email.toLocaleUpperCase() || "PROFILE"}
          </button>
          <button onClick={handleLogout}>LOGOUT</button>
        </>
      ) : (
        <button onClick={() => router.push("/login")}>Login</button>
      )}
    </div>
  );
};

export default LoginButton;
