"use client";

import "./home.css";
import { useEffect, useState } from "react";
import { getProject, getProjectDetails } from "@/axios";
import {
  evaluateCompletion,
  shortenText,
  weiToEthString,
} from "@/utils/projectDetails";
import { useRouter } from "next/navigation";

export default function Page(props) {
  const router = useRouter();
  const [blockCount, setBlockCount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState([]);
  const [projectTitle, setProjectTitle] = useState("Loading project...");
  const [error, setError] = useState("");
  const { id } = props.params;

  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    const user = sessionStorage.getItem("username");
    setUsername(user);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    router.reload("/projects");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProjectDetails(id);
        const data = response.data;
        if (data) {
          setProjectTitle(data.projectDetails.title);
          setBlockCount(data.blockCount);
          setTransactions(data.transactions);
          setData(data);
          localStorage.setItem("txs", JSON.stringify(data.transactions));
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
  }, [id]);

  const renderBlocks = () => {
    let blocks = [];
    for (let i = 1; i <= blockCount; i++) {
      blocks.push(
        <div key={i} onClick={() => onBlockClick(i)}>
          <div className="rounded-rectangle"></div>
          <span className="block-number">#{i}</span>
        </div>,
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

  const onBlockClick = (id) => {
    const tx = transactions[id];
    router.push(`/blocks/${id}`);
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
      <div className="home-container">
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
              {username ? (
                <button onClick={() => router.push("/profile")}>
                  {username}
                </button>
              ) : (
                <button onClick={() => router.push("/login")}>Login</button>
              )}
              {username && <button onClick={handleLogout}>Logout</button>}
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
            {data.projectDetails && data.projectDetails.currentPhase && (
              <div className="project-details_1">
                <span>
                  {evaluateCompletion(data.projectDetails.currentPhase)}%
                </span>
                <span>{data.projectDetails.phaseDescription}</span>
                <span>
                  {weiToEthString(data.projectDetails.fundsSpent)} ETH
                </span>
                <span>Phase {data.projectDetails.currentPhase}/6</span>
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
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => {
              return (
                <div key={index} className="transaction-details_1">
                  <span>{index + 1}</span>
                  <span>{weiToEthString(transaction.val)} ETH</span>
                  <span>
                    <a href="profiles/sender.html" className="profile-link">
                      <u>{shortenText(transaction.sender, 12)}</u>
                    </a>
                  </span>
                  <span>
                    <a href="profiles/receiver.html" className="profile-link">
                      <u>{shortenText(transaction.receiver, 12)}</u>
                    </a>
                  </span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              );
            })
          ) : (
            <div className="transaction-details_1">No transactions found</div>
          )}
        </main>
      </div>
    </>
  );
}
