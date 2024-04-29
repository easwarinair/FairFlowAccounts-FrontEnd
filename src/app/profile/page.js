"use client";

import "./profile.css";
import { useEffect, useState } from "react";
import { ProjectStatusAPICall } from "@/axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { showErrorToast } from "@/utils/toast";
import { useUserContext } from "@/context/UserContext";

export default function Page() {
  const [user, setUser] = useState(null);
  const [statuses, setStatuses] = useState(null);
  const [loading, setLoading] = useState("loading");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading("loading");
        const res = await ProjectStatusAPICall();
        if (res.status === 200 && res.data.result) {
          setLoading("success");
          setStatuses(res.data.result);
        } else setLoading("error");
      } catch (err) {
        console.log(err);
        setLoading("error");
        showErrorToast(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getProfileName = () => {
      let user = "";
      try {
        if (typeof window !== "undefined") {
          const searchParams = useSearchParams();
          const param = searchParams.get("user");
          user = param;
        }
      } catch (err) {
        console.log(err);
        showErrorToast(err.message || "Failed to get profile name.");
      } finally {
        setUser(user);
      }

      getProfileName();
    };
  }, []);

  // Redirect to login if no user data found
  const { signedIn, handleLogout } = useUserContext();
  useEffect(() => {
    if (!signedIn.status && typeof window !== "undefined") {
      showErrorToast("Login to perform this action.");
      router.push("/login");
    }
  }, []);

  return (
    <div className="profile-container">
      <header className="header">
        <div className="logo">
          <Link href="/home">
            <span className="mag">FairFlow</span>
            <br />
            <span className="black">Accounts</span>
          </Link>
        </div>
        <div className="search-bar">
          <input
            type="text"
            style={{ fontWeight: "bold" }}
            placeholder="Search transactions by block number, date, or more..."
          />
        </div>
      </header>
      <main>
        <div className="circle-container">
          <div className="circle">
            <img src="profile.png" alt="Profile" />
          </div>
          <h3 className="profile-name">@{user || ""}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </main>
    </div>
  );
}
