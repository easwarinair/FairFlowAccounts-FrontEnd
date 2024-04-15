"use client";

import { useEffect, useState } from "react";
import "./profile.css";
import { useSearchParams } from "next/navigation";
import { ProjectStatusAPICall } from "@/axios";

export default function Page() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

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

  console.log(statuses);
  return (
    <>
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
            placeholder="Search transactions by block number, date, or more..."
          />
        </div>
      </header>
      <main>
        <div className="circle-container">
          <a href="../transaction_form/transaction_form.html">
            <div className="circle">
              <img src="profile.png" />
            </div>
          </a>
          <h3 className="profile-name">
            @<span id="username">{user}</span>
          </h3>
        </div>

        <div className="profile_status">
          {loading === "loading" && <p>loading...</p>}
          {loading === "error" && <p>error...</p>}
          {loading === "success" && statuses.length === 0 && <div>No statuses</div>}
          {loading === "success" && statuses.length > 0 && (
            <div>
              {statuses.map((status, index) => {
                return <p key={index}>{status}</p>;
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
{
  /* <script>
        document.getElementById('username').textContent = new URLSearchParams(window.location.search).get('user');
    </script> */
}
