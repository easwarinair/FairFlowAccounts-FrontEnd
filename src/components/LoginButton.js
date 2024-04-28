"use client";

import { LogoutAPI } from "@/axios";
import { useUserContext } from "@/context/UserContext";
import { showErrorToast } from "@/utils/toast";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  const { signedIn } = useUserContext();

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
      showErrorToast(err.message || "Something went wrong while trying to logout");
    }
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
