"use client";

import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  const { signedIn } = useUserContext();

  const handleLogout = () => {
    if (typeof window === "undefined") return;
    router.push("/login");
  };

  return (
    <div className="login-button">
      {signedIn.status ? (
        <>
          <button onClick={() => router.push("/profile")}>
            {signedIn?.data?.name.toLocaleUpperCase() || "PROFILE"}
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
