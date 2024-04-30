import "./transaction.css";
import React from "react";
import PropTypes from "prop-types";
import { Contract, ethers, isAddress } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { fundProject } from "@/axios";
import { ethToWeiString } from "@/utils/projectDetails";
import { data } from "@/constants/FairFlowData";
import Link from "next/link";

const Transaction = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState({ address: undefined });
  const [txProgress, setTxProgress] = useState({ status: "Idle", hash: null });
  const [formValue, setFormValue] = useState(`${props.textinputPlaceholder}`);

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
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  function checkAddress(address) {
    if (isAddress(address)) return address;
    else {
      const error = new Error("Invalid Address!");
      error.code = "INVALID_ADDRESS_ERROR";
      throw error;
    }
  }

  function transactionSuccess(hash) {
    console.log(`Transaction hash: ${hash}`);
    if (hash) {
      setTxProgress({ status: "Done", hash: hash });
      showSuccessToast(`Funds sent successfully! Transaction hash is ${hash}`);
    }
  }

  async function makeTransaction(value, signer, txTitle) {
    const abi = data.abi;
    const contract = new ethers.Contract(props.contractAddress, abi, signer);

    switch (txTitle) {
      case "Fund project":
        try {
          const tx = await contract.fundProject({
            value: ethers.parseEther(value),
          });
          await tx.wait();
          transactionSuccess(tx.hash);
        } catch (error) {
          showErrorToast("An error has occured!");
          console.log(error);
        }
        break;

      case "Submit Update":
        try {
          const tx = await contract.updatePhase(value);
          await tx.wait();
          transactionSuccess(tx.hash);
        } catch (error) {
          showErrorToast("An error has occured!");
          console.log(error);
        }

      case "Complete Phase":
        try {
          const tx = await contract.completePhase();
          await tx.wait();
          transactionSuccess(tx.hash);
        } catch (error) {
          showErrorToast("An error has occured!");
          console.log(error);
        }

      case "Send Funds":
        try {
          const tx = await contract.completePhase();
          await tx.wait();
          transactionSuccess(tx.hash);
        } catch (error) {
          showErrorToast("An error has occured!");
          console.log(error);
        }

      case "Add Manager":
        const addressToAdd = checkAddress(value);
        try {
          const tx = await contract.addManager(addressToAdd);
          await tx.wait();
          transactionSuccess(tx.hash);
        } catch (error) {
          showErrorToast("An error has occured!");
          console.log(error);
        }

      case "Remove Manager":
        const addressToRemove = checkAddress(value);
        try {
          const tx = await contract.removeManager(addressToRemove);
          await tx.wait();
          transactionSuccess(tx.hash);
        } catch (error) {
          showErrorToast("An error has occured!");
          console.log(error);
        }

      default:
        break;
    }
  }

  return (
    <div className="transaction-container">
      <div className="transaction-container1">
        <span className="transaction-text">{props.txTitle}</span>
        <div className="transaction-container2"></div>
        {props.inputLabel ? (
          <div className="transaction-container3">
            <span className="transaction-text1">{props.inputLabel}</span>
            <input
              type="text"
              placeholder={props.textinputPlaceholder}
              className="input transaction-textinput"
              value={formValue}
              required
              onChange={(e) => setFormValue(e.target.value)}
            />
          </div>
        ) : (
          <div></div>
        )}
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
                makeTransaction(formValue, signer, props.sendButton);
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
