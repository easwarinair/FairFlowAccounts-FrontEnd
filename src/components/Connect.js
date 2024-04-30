import { useEffect, useState } from "react";
import { Contract, ContractFactory, ethers } from "ethers";
import { shortenText } from "@/utils/projectDetails";
import { data } from "@/constants/FairFlowData";
import { deployContract } from "@/axios";

const ConnectButton = ({ projectData }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedProvider, setConnectedProvider] = useState();
  const [signer, setSigner] = useState();

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setConnectedProvider(provider);
        setSigner(await provider.getSigner());
        setIsConnected(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function createProject() {
    console.log("Got Projects:", projectData.phases);
    console.log("Signer is: ", signer);
    const abi = data.abi;
    const bin = data.bin;
    const contractFactory = new ContractFactory(abi, bin, signer);
    try {
      const contract = await contractFactory.deploy(
        projectData.title,
        projectData.description,
        ethers.parseEther(projectData.cost).toString(),
        projectData.phases
      );
      console.log("Deploying...");
      const tx = await contract.deploymentTransaction();
      const txRec = await contract.deploymentTransaction().wait(1);
      console.log("Transaction response: ", tx, "Transaction Receipt: ", txRec);
      console.log(tx.hash, txRec.contractAddress);
      const res = await deployContract({
        title: projectData.title,
        contractAddress: txRec.contractAddress,
        txHash: tx.hash,
      });
      console.log("Added to database", res);
    } catch (error) {
      console.log("Error! Details: ", error);
    }
  }

  return (
    <div>
      {isConnected ? (
        <div>
          <p>{`Connected to Metamask wallet with address ${shortenText(signer.address, 12)}!`}</p>
          <button onClick={createProject}>Create Project</button>
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectButton;
