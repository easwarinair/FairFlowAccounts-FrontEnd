export default function formatTimestamp(timestamp) {
  if (!timestamp) return null;
  const ts = new Date(timestamp).toString();
  const arr = ts.split(" ");
  const ans = [];
  ans.push(
    arr[0],
    ", ",
    arr[1],
    " ",
    arr[2],
    " ",
    arr[3],
    ", ",
    arr[4],
    " IST"
  );
  return ans.join("");
}
