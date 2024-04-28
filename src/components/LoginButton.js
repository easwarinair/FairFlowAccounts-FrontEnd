"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const LoginButton = () => {
  const [username, setUsername] = useState("");
  const router = useRouter()

  const handleLogout = () => {
    if (typeof window === "undefined") return;
    window.sessionStorage.clear();
    router.reload("/projects");
  };

  useEffect(() => {
    const user = sessionStorage.getItem("username");
    setUsername(user);
  }, []);

  return (
    <div className="login-button">
      {username ? (
        <button onClick={() => router.push("/profile")}>{username}</button>
      ) : (
        <button onClick={() => router.push("/login")}>Login</button>
      )}
      {username && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default LoginButton;
