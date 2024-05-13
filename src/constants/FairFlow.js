import { data } from "./FairFlowData";

export default async function getConstants(req, res) {
  const abi = data.abi;
  const bin = data.bin;
  const fileContents = await fs.readFile(
    jsonDirectory + "/FairFlow.json",
    "utf-8"
  );
  // console.log(abi, bin);
  res.status(200).json(JSON.parse(fileContents));
}
