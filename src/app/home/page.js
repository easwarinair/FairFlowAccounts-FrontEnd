"use client";
import "./home.css";
import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import { useRouter } from "next/navigation";
import { ProjectStatusAPICall } from "@/axios";
import Link from "next/link";
import { showErrorToast } from "@/utils/toast";
import LoginButton from "@/components/LoginButton";

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
  const [projectDescription, setProjectDescription] = useState(
    "Expand to read more about the project specifics, goals, and implementation phases."
  );
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProjectStatusAPICall();
        if (response.status !== 200) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const { data } = response;

        if (data) {
          // console.log("setting up....", data.result.title);
          setProjectTitle(data.result.title);
          setProjectDescription(data.result.description);
          setBlockCount(data.blockCount);
          setTransactions(data.transactions);
          setData(data);
        } else {
          console.error("No project data");
          setError("No data found");
          showErrorToast("No data found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch project data");
        showErrorToast(err.message || "Failed to fetch project data");
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
    // console.log(transactions);
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

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery && !isNaN(searchQuery)) {
      const blockId = parseInt(searchQuery, 10);
      if (blockId > 0 && blockId <= blockCount) {
        router.push(`/blocks`);
      } else {
        showErrorToast("Block number out of range");
      }
    } else {
      showErrorToast("Please enter a valid block number");
    }
  };

  const toggleDescription = () => setDescriptionOpen(!isDescriptionOpen);

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
            </form>
          </div>
          <LoginButton />
        </div>
      </header>
      <main>
        <div className="project-title-container">
          <h1
            className="project-title"
            style={{ textDecoration: isDescriptionOpen ? "none" : "underline" }}
          >
            {projectTitle}
          </h1>
          <button onClick={toggleDescription} className="dropdown-button">
            {isDescriptionOpen ? "\u25B2" : "\u25BC"}{" "}
            {/* Unicode arrows for up and down */}
          </button>
          {isDescriptionOpen && (
            <p className="project-description">
              {projectDescription || "Default description if none is fetched"}
            </p>
          )}
        </div>
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
