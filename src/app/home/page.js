"use client";
import "./home.css";
import { useEffect, useState } from "react";

export default function Page() {
  const [blockCount, setBlockCount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [projectTitle, setProjectTitle] = useState("Loading project...");
  const [error, setError] = useState("");

  useEffect(() => {
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
          setProjectTitle(data.result.title);
          setBlockCount(data.blockCount);
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
  }, []);

  const renderBlocks = () => {
    let blocks = [];
    for (let i = 1; i <= blockCount; i++) {
      blocks.push(
        <a key={i} className="rounded-rectangle">
          <span className="block-number">#{i}</span>
        </a>
      );
    }

    return blocks;
  };

  const renderTransactions = () => {
    return Array.from({ length: blockCount }, (_, i) => (
      <div key={i} className="transaction-details_1">
        <span>{i + 1}</span>
        <span>Rs {Math.random() * 100000}</span>
        <span>
          <a href="profiles/sender.html" className="profile-link">
            <u>@senderId</u>
          </a>
        </span>
        <span>
          <a href="profiles/receiver.html" className="profile-link">
            <u>@receiverId</u>
          </a>
        </span>
        <span>{new Date().toLocaleString()}</span>
      </div>
    ));
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <span className="mag">FairFlow</span>
            <br />
            <span className="black">Accounts</span>
          </div>
          <div className="search-bar">
            <input
              type="text"
              style={{ fontWeight: "bold" }}
              placeholder="Search transactions by block number, date, or more..."
            />
          </div>
          <div className="login-button">
            <a href="/login">
              <button style={{ color: "white" }}>Login</button>
            </a>
          </div>
        </div>
      </header>
      <main>
        <h1 className="project-title">
          {error ? `Error: ${error}` : projectTitle || "Loading project..."}
        </h1>
      </main>
      <main>
        <div className="project-details-container">
          <div className="project-details">
            <span>Progress</span>
            <span>Current Expenditure</span>
            <span>Expected Cost</span>
            <span>Latest Update</span>
          </div>
          <div className="project-details_1">
            <span>63%</span>
            <span>2.85 Cr</span>
            <span>6 Cr</span>
            <span>Phase 5/8</span>
          </div>
        </div>

        <h3 className="project-subheading">Latest Transactions</h3>
        <div className="rectangle-container">{renderBlocks()}</div>

        {/*<div className="project-status" id="project_status">
          Project status
          <p id="project_data"></p>
  </div>*/}

        <div className="transaction-details">
          <span>Block No</span>
          <span>Amount</span>
          <span>Sender ID</span>
          <span>Receiver ID</span>
          <span>Timestamp</span>
        </div>
        <div>{renderTransactions()} </div>
      </main>
    </>
  );
}
