import { BigNumber } from "bignumber.js";

function weiToEthString(weiString) {
  // Create a BigNumber from the wei string
  const wei = new BigNumber(weiString);
  // Define the conversion factor from wei to ether: 10^18
  const factor = new BigNumber("1e18");
  // Divide wei by the factor to get ether and convert it to a string
  const ether = wei.dividedBy(factor);
  return ether.toString();
}

function evaluateCompletion(phase) {
  const curr = parseInt(phase);
  const total = 6;
  const percentage = (curr / total) * 100;
  return percentage.toFixed(0);
}

function shortenText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    const halfLength = Math.floor((maxLength - 3) / 2);
    const firstHalf = text.substring(0, halfLength);
    const secondHalf = text.substring(text.length - halfLength);
    return firstHalf + "..." + secondHalf;
  }
}

export { shortenText, evaluateCompletion, weiToEthString };
