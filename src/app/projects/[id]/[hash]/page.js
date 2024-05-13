"use client";

import "./home.css";
import { Button } from "@nextui-org/button";
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
import { showErrorToast } from "@/utils/toast";
import BackButton from "@/components/BackButton";
import { LinkIcon } from "@/constants/ExternalLink";
import formatTimestamp from "@/utils/formatTimestamp";
import { useUserContext } from "@/context/UserContext";

export default function Page(props) {
  const router = useRouter();
  const [blockCount, setBlockCount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState(["false"]);
  const [projectTitle, setProjectTitle] = useState("Loading project...");
  const [error, setError] = useState("");
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);
  const { id, hash } = props.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [txs, setTxs] = useState([]);
  const { signedIn, checkSignedIn } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return showErrorToast("No id");
        if (!hash) return showErrorToast("No hash");
        const response = await getProjectDetails(id, hash);
        const data = response.data;
        // console.log(data);
        if (data) {
          setProjectTitle(data.projectDetails.title);
          setBlockCount(data.blockCount);
          setTransactions(data.transactions);
          setData(data);
          localStorage.setItem("txs", JSON.stringify(data.transactions));
          checkSignedIn();
        } else {
          console.error("No project data");
          setError("No data found");
          showErrorToast("No data found");
        }
      } catch (err) {
        // console.error("Fetch error:", err);
        // showErrorToast(err.message || "Failed to fetch project data");
        setError("Error while fetching data");
      }
    };

    fetchData();
  }, [id]);

  const renderBlocks = () => {
    let blocks = [];
    for (let i = blockCount; i >= 1; i--) {
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

  const toggleDescription = () => setDescriptionOpen(!isDescriptionOpen);

  const onBlockClick = (number) => {
    router.push(`/blocks/${id}/${number}`);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery && !isNaN(searchQuery)) {
      const blockId = parseInt(searchQuery, 10);
      if (blockId > 0 && blockId <= blockCount) {
        router.push(`/blocks/${id}/${blockId}`);
      } else {
        showErrorToast("Block number out of range");
      }
    } else {
      showErrorToast("Please enter a valid block number");
    }
  };

  const handleMakeTransactionClick = (address) => {
    router.push(`/transactions/${address}`);
  };

  return (
    <>
      <div className="home-container">
        <header className="header">
          <div className="header-container">
            <BackButton />
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
                {/*<button type="submit">Search</button>*/}
              </form>
            </div>
            <LoginButton />
          </div>
        </header>
        <main>
          <div className="project-title-container">
            <h1
              className="project-title"
              style={{
                textDecoration: isDescriptionOpen ? "none" : "underline",
              }}
            >
              {projectTitle}
            </h1>
            <button onClick={toggleDescription} className="dropdown-button">
              {isDescriptionOpen ? "\u25B2" : "\u25BC"}{" "}
            </button>
            {isDescriptionOpen && (
              <div className="parent-description-box">
                {data[0] === false ? (
                  <div className="description-box">
                    <p>Loading</p>
                  </div>
                ) : (
                  <div className="description-box">
                    <span className="description-title">Description</span>
                    <p className="description">
                      {data.projectDetails.projectDescription}
                    </p>
                    <span className="description-title">Latest Update</span>
                    <p className="description">
                      {data.projectDetails.latestUpdate}
                    </p>
                    <span className="description-title">Contract Balance</span>
                    <p className="description">
                      {weiToEthString(data.projectDetails.balance) + " ETH"}
                    </p>
                    <span className="description-title">Balance Summary</span>
                    <p className="description">
                      {"Total Funds Received: " +
                        weiToEthString(data.projectDetails.fundsReceived) +
                        " ETH"}
                    </p>
                    <p className="description">
                      {"Total Funds Spent: " +
                        "   " +
                        weiToEthString(data.projectDetails.fundsSpent) +
                        " ETH"}
                    </p>
                    <span className="description-title">Contract Address</span>
                    <Link
                      href={`https://sepolia.etherscan.io/address/${id}`}
                      target="_blank"
                      draggable={false}
                    >
                      <p className="description">{id}</p>
                    </Link>
                  </div>
                )}
              </div>
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

          <div className="transactions-header">
            <h3 className="project_subheading">Latest Transactions</h3>
            {data[0] !== "false" &&
              (signedIn.authLevel == 1 || signedIn.authLevel == 0) && (
                <Button
                  onClick={() => {
                    handleMakeTransactionClick(`${id}`);
                  }}
                  className="make-transactions-button"
                  endContent={<LinkIcon />}
                >
                  Make Transactions
                </Button>
              )}
          </div>
          <div className="rectangle-container">{renderBlocks()}</div>
          <div className="transaction-table">
            <table className="transaction-details">
              <tr>
                <th>Block No</th>
                <th>Amount</th>
                <th>Sender ID</th>
                <th>Receiver ID</th>
                <th>Timestamp</th>
              </tr>

              {transactions && transactions.length > 0 ? (
                transactions.toReversed().map((transaction, index) => {
                  if (
                    transaction.sign === "sendFunds(address,uint256,string)"
                  ) {
                    const args = transaction.arg.split(",");
                    return (
                      <tr key={index} className="transaction-details_1">
                        <td>
                          <div
                            className="table-link-entry"
                            onClick={() =>
                              onBlockClick(transactions.length - index)
                            }
                          >
                            {transactions.length - index}
                          </div>
                        </td>
                        <td>{weiToEthString(args[1] || 0)} ETH</td>
                        <td>
                          <Link
                            href={`https://sepolia.etherscan.io/address/${transaction.sender}`}
                            target="_blank"
                            draggable={false}
                          >
                            <span className="table-link-entry">
                              {shortenText(transaction.sender, 12)}
                            </span>
                          </Link>
                        </td>
                        <td>
                          <Link
                            href={`https://sepolia.etherscan.io/address/${args[0]}`}
                            target="_blank"
                            draggable={false}
                          >
                            <span className="table-link-entry">
                              {shortenText(args[0], 12)}
                            </span>
                          </Link>
                        </td>
                        <td>{formatTimestamp(transaction.timestamp)}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index} className="transaction-details_1">
                        <td>
                          <div
                            className="table-link-entry"
                            onClick={() =>
                              onBlockClick(transactions.length - index)
                            }
                          >
                            {transactions.length - index}
                          </div>
                        </td>
                        <td>{weiToEthString(transaction.val)} ETH</td>
                        <td>
                          <Link
                            href={`https://sepolia.etherscan.io/address/${transaction.sender}`}
                            target="_blank"
                            draggable={false}
                          >
                            <span className="table-link-entry">
                              {shortenText(transaction.sender, 12)}
                            </span>
                          </Link>
                        </td>
                        <td>
                          <Link
                            href={`https://sepolia.etherscan.io/address/${transaction.receiver}`}
                            target="_blank"
                            draggable={false}
                          >
                            <span className="table-link-entry">
                              {shortenText(transaction.receiver, 12)}
                            </span>
                          </Link>
                        </td>
                        <td>{formatTimestamp(transaction.timestamp)}</td>
                      </tr>
                    );
                  }
                })
              ) : (
                <tr className="transaction-details_1">No transactions found</tr>
              )}
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
