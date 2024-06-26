import { weiToEthString } from "@/utils/projectDetails";
import EtherscanLink from "./EtherscanLink";

export default function BlockDetails(props) {
  if (props.type == "contractCreated()") {
    return (
      <div>
        <div className="transactionTitleBlock">
          <span className="transactionTitle">Project Created</span>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Created By: </span>
          <EtherscanLink type="address">{props.details.sender}</EtherscanLink>
        </div>
      </div>
    );
  } else if (
    props.type == "sendEtherToContract()" ||
    props.type == "fundProject()"
  ) {
    return (
      <div>
        <div className="transactionTitleBlock">
          <span className="transactionTitle">Funds Added To Contract</span>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Funds Added By: </span>
          <EtherscanLink type="address">{props.details.sender}</EtherscanLink>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Amount: </span>
          <span>{weiToEthString(props.details.val) + " ETH"}</span>
        </div>
      </div>
    );
  } else if (props.type == "completePhase()") {
    return (
      <div>
        <div className="transactionTitleBlock">
          <span className="transactionTitle">Phase Marked as Completed</span>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Completion marked by: </span>
          <EtherscanLink type="address">{props.details.sender}</EtherscanLink>
        </div>
      </div>
    );
  } else if (props.type == "updatePhase(string)") {
    return (
      <div>
        <div className="transactionTitleBlock">
          <span className="transactionTitle">Phase Updated</span>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Updation marked by: </span>
          <EtherscanLink type="address">{props.details.sender}</EtherscanLink>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Latest Update: </span>
          <EtherscanLink type="address">{props.details.arg}</EtherscanLink>
        </div>
      </div>
    );
  } else if (props.type == "sendFunds(address,uint256,string)") {
    const args = props.details.arg.split(",");
    return (
      <div>
        <div className="transactionTitleBlock">
          <span className="transactionTitle">
            Funds Sent to an External Wallet
          </span>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Transaction sanctioned by: </span>
          <EtherscanLink type="address">{props.details.sender}</EtherscanLink>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Funds Sent To: </span>
          <EtherscanLink type="address">{args[0]}</EtherscanLink>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Amount Sent: </span>
          <span>{weiToEthString(args[1]) + " ETH"}</span>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Purpose of Fund: </span>
          <span>{args[2]} </span>
        </div>
      </div>
    );
  } else if (props.type == "addManager(address)") {
    return (
      <div>
        <div className="transactionTitleBlock">
          <span className="transactionTitle">New Fund Manager Added</span>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">New Manager Added By: </span>
          <EtherscanLink type="address">{props.details.sender}</EtherscanLink>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">New Manager Address: </span>
          <EtherscanLink type="address">{props.details.arg}</EtherscanLink>
        </div>
      </div>
    );
  } else if (props.type == "removeManager(address)") {
    return (
      <div>
        <div className="transactionTitleBlock">
          <span className="transactionTitle">Fund Manager Removed</span>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Manager Removed By: </span>
          <EtherscanLink type="address">{props.details.sender}</EtherscanLink>
        </div>
        <div className="blockDetailTitleBlock">
          <span className="blockDetailTitle">Removed Manager's Address: </span>
          <EtherscanLink type="address">{props.details.arg}</EtherscanLink>
        </div>
      </div>
    );
  }
}
