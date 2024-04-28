"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import "./styles.css";
import Link from "next/link";

export default function Page() {
  const { id } = useParams();
  const [transactions, setTxs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const txs = JSON.parse(localStorage.getItem("txs"));
        if (txs) {
          console.log("Got transactions:", txs[id - 1]);
          setTxs(txs);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);
  return (
    <>
      <header className="header">
        <div className="logo">
          <Link href="/home">
            <span className="mag">FairFlow</span>
            <br />
            <span className="black">Accounts</span>
          </Link>
        </div>
      </header>
      <main>
        <div className="rectangle-container">
          <div className="rounded-rectangle"></div>
        </div>
        <h3 className="block-heading">Block #{id}</h3>
        {transactions[id - 1] ? (
          <p>Created on 29th April 2024 by {transactions[id - 1].sender}</p>
        ) : (
          <p>Loading transaction data...</p> // Provide a loading state or a fallback
        )}
        <h4 className="block-details">Details</h4>
      </main>
    </>
  );
}
