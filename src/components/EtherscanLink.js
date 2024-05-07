import Link from "next/link";

const EtherscanLink = (props) => {
  if (!props.children) return <></>;
  const baseUrl = `https://sepolia.etherscan.io/${props.type}/${props.children}`;

  return ["address", "tx"].includes(props.type) ? (
    <Link
      href={baseUrl}
      className="etherscan_link"
      target="_blank"
      draggable={false}
    >
      {props.children}
    </Link>
  ) : (
    <></>
  );
};

export default EtherscanLink;
