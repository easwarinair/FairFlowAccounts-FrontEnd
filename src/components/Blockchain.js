import { ethers } from "ethers";

async function deployContract(
  projectTitle,
  projectDescription,
  fundsRequired,
  projectPhases
) {
  const url = process.env.RPC_URL;
  const provider = new ethers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const ffPath = path.join(__dirname);
  const abi = fs.readFileSync(
    path.join(ffPath, "/FairFlowAccounts_sol_FairFlowAccounts.abi"),
    "utf-8"
  );
  const bin = fs.readFileSync(
    path.join(ffPath, "/FairFlowAccounts_sol_FairFlowAccounts.bin"),
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  const contract = await contractFactory.deploy(
    projectTitle,
    projectDescription,
    fundsRequired,
    projectPhases
  );
  // console.log("Deploying contract...");
  const response = await contract.waitForDeployment();
  const tx = await contract.deploymentTransaction();
  const txRec = await contract.deploymentTransaction().wait(1);
  return { hash: tx.hash, contractAddress: txRec.contractAddress };
  // writeHashToEnv(tx.hash);
  // writeCAToEnv(txRec.contractAddress);
}
