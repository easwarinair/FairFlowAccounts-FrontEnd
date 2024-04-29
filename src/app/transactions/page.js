"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { getProjects } from "@/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";
import { showErrorToast } from "@/utils/toast";
import Transaction from "@/components/Transaction";
import Modal from "@/components/Modal"; 

export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});
  const route = useRouter();

  useEffect(() => {
    function getTransactions(authLevel) {
      const defaultTransactions = [
        { title: "Fund the project", details: { txTitle: "Fund the project", textinputPlaceholder: "Enter the amount (in Rupees)", inputLabel: "Amount", connectButton: "Connect Wallet", sendButton: "Send Funds", showInput: true, showButton: true } },
        { title: "Add an update to current phase", details: { txTitle: "Add an update to current phase", textinputPlaceholder: "Describe the update", inputLabel: "Update", connectButton: "Update Phase", sendButton: "Submit Update", showInput: true, showButton: true } },
        { title: "Mark the current phase as completed", details: { txTitle: "Mark the current phase as completed", connectButton: "Complete Phase", sendButton: "Confirm Completion", showInput: false, showButton: true } },
        { title: "Send funds outside the project", details: { txTitle: "Send funds outside the project", textinputPlaceholder: "Amount to send", inputLabel: "Amount", connectButton: "Connect External Wallet", sendButton: "Send Funds", showInput: true, showButton: true } }
      ];
      
      const adminTransactions = [
        { title: "Add a manager", details: { txTitle: "Add a manager", textinputPlaceholder: "Manager's email", inputLabel: "Email", connectButton: "Add Manager", sendButton: "Confirm Addition", showInput: true, showButton: true } },
        { title: "Remove a manager", details: { txTitle: "Remove a manager", textinputPlaceholder: "Manager's email", inputLabel: "Email", connectButton: "Remove Manager", sendButton: "Confirm Removal", showInput: true, showButton: true } }
      ];
      
      if (authLevel == 1) {
        setTransactions(defaultTransactions);
      } else if (authLevel == 0) {
        const transactions = defaultTransactions.concat(adminTransactions);
        setTransactions(transactions);
      }
    }
    getTransactions(0);
  }, []);


  const handleTransactionClick = (transaction) => {
    setCurrentTransaction(transaction.details);
    setIsModalOpen(true);
  };


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
                onClick={() => handleTransactionClick(transaction)}
                
                // onClick={() =>
                //   onProjectClick(project.contractAddress, project.txHash)
                // }
              >
                <h3 className="block-heading">{transaction.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Transaction key={currentTransaction.txTitle} {...currentTransaction} />
      </Modal>
    </>
  );
}
