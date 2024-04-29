import React from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./transaction.css";
import { toast } from "react-toastify";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { fundProject } from "@/axios";
import { ethToWeiString } from "@/utils/projectDetails";
import Link from "next/link";

const Transaction = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState({ address: undefined });
  const [txProgress, setTxProgress] = useState({ status: "Idle", hash: null });

  const [fundValue, setFundValue] = useState("0");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);
        console.log("got signer: ", signer);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function sendFunds(value, signer) {
    alert(`Value before conversion: ${value}`);
    const wei = ethers.parseEther(value).toString();
    alert(`Value after conversion: ${wei}`);
    const response = await fundProject({
      value: wei,
      signer: JSON.stringify(signer),
    });
    if (response.status == 200) {
      setTxProgress({ status: "Done", hash: response.data.hash });
      console.log(response.data);
      showSuccessToast(
        `Funds sent successfully! Transaction hash is ${response.data.hash}`
      );
    }
  }

  return (
    <div className="transaction-container">
      <div className="transaction-container1">
        <span className="transaction-text">{props.txTitle}</span>
        <div className="transaction-container2"></div>
        <div className="transaction-container3">
          <span className="transaction-text1">{props.account}</span>
          <input
            type="text"
            placeholder={props.textinputPlaceholder}
            className="input transaction-textinput"
            value={fundValue}
            required
            onChange={(e) => setFundValue(e.target.value)}
          />
        </div>
        <div className="transaction-container4">
          <span className="transaction-text2">{props.account1}</span>
          <div className="transaction-container5">
            {hasMetamask ? (
              isConnected ? (
                `Connected to wallet with address ${signer?.address}`
              ) : (
                <button
                  type="button"
                  className="button transaction-button"
                  onClick={async () => await connect()}
                >
                  {props.connectButton}
                </button>
              )
            ) : (
              "Please install Metamask"
            )}
          </div>
        </div>
        {txProgress.status === "Idle" && (
          <button
            type="button"
            className="button transaction-button1"
            onClick={() => {
              if (hasMetamask && isConnected) {
                setTxProgress({ status: "Waiting", hash: null });
                sendFunds(fundValue, signer);
              } else if (hasMetamask && !isConnected) {
                showErrorToast("Connect your Metamask account to proceed!");
              } else {
                showErrorToast("Please install Metamask!");
              }
            }}
          >
            {props.sendButton}
          </button>
        )}
        <div>
          {txProgress.status == "Idle" ? (
            <div></div>
          ) : txProgress.status == "Waiting" ? (
            <div>Waiting for transaction...</div>
          ) : txProgress.status == "Done" ? (
            <div>
              Transaction completed!{" "}
              <Link
                target="_blank"
                href={`https://sepolia.etherscan.io/tx/${txProgress.hash}`}
              >
                {txProgress.hash}
              </Link>
            </div>
          ) : (
            <div>Transaction failed!</div>
          )}
        </div>
      </div>
    </div>
  );
};

Transaction.defaultProps = {
  amountText: "Amount:",
  textinputPlaceholder: "Enter the amount (in ETH)",
  txTitle: "Fund the project",
  connectButton: "Connect Metamask",
  account: "Amount:",
  account1: "Account:",
  sendButton: "Send",
};

Transaction.propTypes = {
  amountText: PropTypes.string,
  textinputPlaceholder: PropTypes.string,
  txTitle: PropTypes.string,
  connectButton: PropTypes.string,
  account: PropTypes.string,
  account1: PropTypes.string,
  sendButton: PropTypes.string,
};

export default Transaction;
