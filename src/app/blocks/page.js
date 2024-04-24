"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { block } = router.query;
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/project/status`
        );
        console.log("attempting to fetch data");

        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const data = await response.json();
        console.log("data received", data);

        if (data) {
          console.log("setting up....", data.result.title);
          setTransactions(data.transactions);
        } else {
          console.error("No project data");
          setError("No data found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch project data");
      }
    };
    fetchData();
  }, [router.isReady, block]);
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
            style={{ fontWeight: "bold" }}
            placeholder="Search transactions by block number, date, or more..."
          />
        </div>
      </header>
      <main>
        <div className="rectangle-container">
          <div className="rounded-rectangle"></div>
        </div>
        <h3 className="block-heading">Block #{block}</h3>
        <h4 className="block-details">Details</h4>
      </main>
    </>
  );
}