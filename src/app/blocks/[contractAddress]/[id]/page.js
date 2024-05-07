"use client";

import { useEffect, useState } from "react";

import styles from "./styles.module.css";
import Link from "next/link";
import formatTimestamp from "@/utils/formatTimestamp";
import EtherscanLink from "@/components/EtherscanLink";
import BlockDetails from "@/components/BlockDetails";
import BackButton from "@/components/BackButton";

export default function Page(props) {
  const { id, contractAddress } = props.params;
  const [transactions, setTxs] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const txs = JSON.parse(localStorage.getItem("txs"));
        if (txs) {
          console.log("Got transactions:", txs[id - 1]);
          setTxs(txs[id - 1]);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);
  return (
    <>
      <header className={styles.header}>
        <BackButton />
        <div className={styles.logo}>
          <Link href="/projects">
            <span className={styles.mag}>FairFlow</span>
            <br />
            <span className={styles.black}>Accounts</span>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.rectangle_container}>
          <div className={styles.rounded_rectangle}></div>
        </div>
        <h3 className={styles.block_heading}>Block #{id}</h3>
        {transactions ? (
          <p className={styles.created_on}>
            Created on{" "}
            <span className={styles.timestamp}>
              {formatTimestamp(transactions.timestamp)}
            </span>{" "}
            by{" "}
            <EtherscanLink type="address">{transactions.sender}</EtherscanLink>
          </p>
        ) : (
          <p>Loading transaction data...</p> // Provide a loading state or a fallback
        )}
        <h4 className={styles.block_details}>Details</h4>
        <BlockDetails
          type={transactions?.sign || ""}
          details={transactions || {}}
        >
          Hello
        </BlockDetails>
      </main>
    </>
  );
}
