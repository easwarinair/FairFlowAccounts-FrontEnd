import React from "react";
import PropTypes from "prop-types";
import "./transaction.css";

const Transaction = (props) => {
  return (
    <div className="transaction-container">
      <div className="transaction-container1">
        <span className="transaction-text">{props.txTitle}</span>
        {props.showInput && (
          <div className="transaction-container3">
            <span className="transaction-text1">{props.inputLabel}</span>
            <input
              type="text"
              placeholder={props.textinputPlaceholder}
              className="input transaction-textinput"
            />
          </div>
        )}
        {props.showButton && (
          <div className="transaction-container4">
            <button type="button" className="button transaction-button">
              {props.connectButton}
            </button>
          </div>
        )}
        <button type="button" className="button transaction-button1">
          {props.sendButton}
        </button>
      </div>
    </div>
  );
};

Transaction.propTypes = {
  txTitle: PropTypes.string.isRequired,
  inputLabel: PropTypes.string,
  textinputPlaceholder: PropTypes.string,
  connectButton: PropTypes.string,
  sendButton: PropTypes.string.isRequired,
  showInput: PropTypes.bool,
  showButton: PropTypes.bool,
};

Transaction.defaultProps = {
  showInput: true,
  showButton: true,
};

export default Transaction;