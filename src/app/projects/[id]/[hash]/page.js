"use client";

import "../home.css";
import { useEffect, useState } from "react";
import { getProjectDetails } from "@/axios";
import {
  evaluateCompletion,
  shortenText,
  weiToEthString,
} from "@/utils/projectDetails";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";

export default function Page(props) {
  const router = useRouter();
  const [blockCount, setBlockCount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState([]);
  const [projectTitle, setProjectTitle] = useState("Loading project...");
  const [error, setError] = useState("");
  const { id, hash } = props.params;

  const [searchQuery, setSearchQuery] = useState("");
  const [txs, setTxs] = useState([]);


  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return alert("No id");
        if (!hash) return alert("No hash");
        const response = await getProjectDetails(id, hash);
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
        <div className="render-block" key={i} onClick={() => onBlockClick(i)}>
          <div className="rounded-rectangle"></div>
          <span className="block-number">#{i}</span>
        </div>
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
          <Link href="profiles/sender.html" className="profile-link">
            <u>{shortenText(transactions[i].sender, 12)}</u>
          </Link>
        </span>
        <span>
          <Link href="profiles/receiver.html" className="profile-link">
            <u>{shortenText(transactions[i].receiver, 12)}</u>
          </Link>
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
            <Link className="back" href="/projects">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-arrow-left"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 12H8" />
                <path d="m12 8-4 4 4 4" />
              </svg>
            </Link>
            <div className="logo">
              <span className="mag">FairFlow</span>
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
            <LoginButton />
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

          <h3 className="project_subheading">Latest Transactions</h3>
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
                    <Link href="profiles/sender.html" className="profile-link">
                      <u>{shortenText(transaction.sender, 12)}</u>
                    </Link>
                  </span>
                  <span>
                    <Link href="profiles/receiver.html" className="profile-link">
                      <u>{shortenText(transaction.receiver, 12)}</u>
                    </Link>
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
