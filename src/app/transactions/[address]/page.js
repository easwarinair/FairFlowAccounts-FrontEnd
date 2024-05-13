"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { getProjects } from "@/axios";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useHistory } from "react-router-dom";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";
import { showErrorToast } from "@/utils/toast";
import BackButton from "@/components/BackButton";
import Transaction from "@/components/Transaction";
import Modal from "@/components/Modal";
import { useUserContext } from "@/context/UserContext";

export default function Page(props) {
  const [transactions, setTransactions] = useState([]);
  const [contractBalance, setContractBalance] = useState(undefined);
  const { signedIn, checkSignedIn } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});
  const contractAddress = props.params.address;
  const route = useRouter();

  function getTransactions(authLevel) {
    const defaultTransactions = [
      {
        title: "Fund the project",
        details: {
          contractAddress: contractAddress,
          txTitle: "Fund the project",
          textinputPlaceholder: "1",
          inputLabel: "Enter the amount (in ETH)",
          connectButton: "Connect Wallet",
          sendButton: "Fund project",
          showInput: true,
          showButton: true,
        },
      },
      {
        title: "Add an update to current phase",
        details: {
          contractAddress: contractAddress,
          txTitle: "Add an update to current phase",
          textinputPlaceholder: "Describe the update",
          inputLabel: "Update",
          connectButton: "Connect Wallet",
          sendButton: "Submit Update",
          showInput: true,
          showButton: true,
        },
      },
      {
        title: "Mark the current phase as completed",
        details: {
          contractAddress: contractAddress,
          txTitle: "Mark the current phase as completed",
          connectButton: "Connect Wallet",
          sendButton: "Complete Phase",
          showInput: false,
          showButton: true,
        },
      },
      {
        title: "Send funds outside the project",
        details: {
          contractAddress: contractAddress,
          txTitle: "Send funds outside the project",
          textinputPlaceholder: "Amount to send",
          inputLabel: "Amount in ETH",
          connectButton: "Connect Wallet",
          sendButton: "Send Funds",
          showInput: true,
          showButton: true,
        },
      },
    ];

    const adminTransactions = [
      {
        title: "Add a manager",
        details: {
          contractAddress: contractAddress,
          txTitle: "Add a manager",
          textinputPlaceholder: "Manager's Wallet Address",
          inputLabel: "Address",
          connectButton: "Connect Wallet",
          sendButton: "Add Manager",
          showInput: true,
          showButton: true,
        },
      },
      {
        title: "Remove a manager",
        details: {
          contractAddress: contractAddress,
          txTitle: "Remove a manager",
          textinputPlaceholder: "Manager's Wallet Address",
          inputLabel: "Address",
          connectButton: "Connect Wallet",
          sendButton: "Remove Manager",
          showInput: true,
          showButton: true,
        },
      },
    ];

    if (authLevel == 1) {
      setTransactions(defaultTransactions);
    } else if (authLevel == 0) {
      const transactions = defaultTransactions.concat(adminTransactions);
      setTransactions(transactions);
    }
  }

  useEffect(() => {
    getBalance();
    checkSignedIn();
    getTransactions(signedIn.authLevel);
  }, []);
  const handleTransactionClick = (transaction) => {
    setCurrentTransaction(transaction.details);
    setIsModalOpen(true);
  };

  const getBalance = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(contractAddress);
        const formattedBalance = ethers.formatUnits(balance.toString());
        setContractBalance(formattedBalance.toString());
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <header className="headers">
        <BackButton />
        <div className="logo">
          <Link href="/projects" className="logo">
            <span className="mag">FairFlow</span>
            <span className="black">Accounts</span>
          </Link>
        </div>
      </header>
      {typeof contractBalance !== "undefined" && (
        <div className="balance-card">
          <span>Contract Balance: </span>
          <strong>{contractBalance} ETH</strong>
        </div>
      )}
      <div className="center">
        {typeof contractBalance !== "undefined" ? (
          <div className="welcome">Available Transactions</div>
        ) : (
          <div className="welcome">Loading...</div>
        )}

        <div className="project">
          {transactions.map((transaction, index) => {
            return (
              <div
                className="project_card"
                key={index}
                onClick={() => handleTransactionClick(transaction)}
              >
                <h3 className="block-heading">{transaction.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={async () => {
          await getBalance();
          setIsModalOpen(false);
        }}
      >
        <Transaction key={currentTransaction.txTitle} {...currentTransaction} />
      </Modal>
    </>
  );
}
