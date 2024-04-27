"use client";

import { useEffect, useState } from "react";
import "./profile.css";
import { ProjectStatusAPICall } from "@/axios";

export default function Page() {
  const [user, setUser] = useState(null);
  const [statuses, setStatuses] = useState(null);
  const [loading, setLoading] = useState("loading");

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
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUser(params.get("user"));
  }, []);

  console.log(statuses);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/projects'); 
  };

   // Redirect to login if no user data found
  useEffect(() => {
    if (!user) {
      router.push('/login');  
    }
  }, [user]);
  
  return (
    <div className="profile-container">
      <header className="header">
        <div className="logo">
          <a href="/home">
            <span className="mag">FairFlow</span>
            <br />
            <span className="black">Accounts</span>
          </a>
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
          <h3 className="profile-name">@{user}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </main>
    </div>
  );
}
