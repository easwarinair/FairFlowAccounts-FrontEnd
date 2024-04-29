"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { getProjects } from "@/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";
import { showErrorToast } from "@/utils/toast";

export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  useEffect(() => {
    function getTransactions(authLevel) {
      const defaultTransactions = [
        "Fund the project",
        "Add an update to current phase",
        "Mark the current phase as completed",
        "Send funds outside the project",
      ];

      const adminTransactions = ["Add a manager", "Remove a manager"];

      if (authLevel == 1) {
        setTransactions(defaultTransactions);
      } else if (authLevel == 0) {
        const transactions = defaultTransactions.concat(adminTransactions);
        setTransactions(transactions);
      }
    }
    getTransactions(0);
  }, []);

  const onProjectClick = (id, hash) => {
    route.push(`/projects/${id}/${hash}`);
  };

  console.log("Transactions are:", transactions);

  return (
    <>
      <header className="headers">
        <div className="logo">
          <Link href="/home" className="logo">
            <span className="mag">FairFlow</span>
            <span className="black">Accounts</span>
          </Link>
        </div>
      </header>
      <div className="center">
        <div className="welcome">Available Transactions</div>
        <div className="project">
          {transactions.map((transaction, index) => {
            return (
              <div
                className="project_card"
                key={index}
                // onClick={() =>
                //   onProjectClick(project.contractAddress, project.txHash)
                // }
              >
                <h3 className="block-heading">{transaction}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
