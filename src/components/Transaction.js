import React from "react";

import PropTypes from "prop-types";

import "./transaction.css";

const Transaction = (props) => {
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
          />
        </div>
        <div className="transaction-container4">
          <span className="transaction-text2">{props.account1}</span>
          <div className="transaction-container5">
            <button type="button" className="button transaction-button">
              {props.connectButton}
            </button>
          </div>
        </div>
        <button type="button" className="button transaction-button1">
          {props.sendButton}
        </button>
      </div>
    </div>
  );
};

Transaction.defaultProps = {
  amountText: "Amount:",
  textinputPlaceholder: "Enter the amount (in Rupees)",
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
