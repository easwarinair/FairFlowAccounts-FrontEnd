"use client";
import "./home.css";
import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";

function weiToEthString(weiString) {
  // Create a BigNumber from the wei string
  const wei = new BigNumber(weiString);
  // Define the conversion factor from wei to ether: 10^18
  const factor = new BigNumber("1e18");
  // Divide wei by the factor to get ether and convert it to a string
  const ether = wei.dividedBy(factor);
  return ether.toString();
}

function evaluateCompletion(phase) {
  const curr = parseInt(phase);
  const total = 6;
  const percentage = (curr / total) * 100;
  return percentage.toFixed(0);
}

function shortenText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    const halfLength = Math.floor((maxLength - 3) / 2);
    const firstHalf = text.substring(0, halfLength);
    const secondHalf = text.substring(text.length - halfLength);
    return firstHalf + "..." + secondHalf;
  }
}

export default function Page() {
  const [blockCount, setBlockCount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState([]);
  const [projectTitle, setProjectTitle] = useState("Loading project...");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
          setData(data);
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
        <a key={i} href="/blocks" className="rounded-rectangle">
          <span className="block-number">#{i}</span>
        </a>
      );
    }

    return blocks;
  };

  const renderTransactions = () => {
    console.log(transactions);
    return Array.from({ length: blockCount }, (_, i) => (
      <div key={i} className="transaction-details_1">
        <span>{i + 1}</span>
        <span>{weiToEthString(transactions[i].val)} ETH</span>
        <span>
          <a href="profiles/sender.html" className="profile-link">
            <u>{shortenText(transactions[i].sender, 12)}</u>
          </a>
        </span>
        <span>
          <a href="profiles/receiver.html" className="profile-link">
            <u>{shortenText(transactions[i].receiver, 12)}</u>
          </a>
        </span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
    ));
  };

   const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery && !isNaN(searchQuery)) {
      const blockId = parseInt(searchQuery, 10);
      if (blockId > 0 && blockId <= blockCount) {
        router.push(`/blocks/${blockId}`);
      } else {
        alert("Block number out of range");
      }
    } else {
      alert("Please enter a valid block number");
    }
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
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  style={{ fontWeight: "bold" }}
                  placeholder="Search transactions by block number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
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
            <span>Current Phase</span>
            <span>Current Expenditure</span>
            <span>Latest Update</span>
          </div>
          {data.result && data.result.currentPhase && (
            <div className="project-details_1">
              <span>{evaluateCompletion(data.result.currentPhase)}%</span>
              <span>{data.result.phaseDescription}</span>
              <span>{weiToEthString(data.result.fundsSpent)} ETH</span>
              <span>Phase {data.result.currentPhase}/6</span>
            </div>
          )}
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
