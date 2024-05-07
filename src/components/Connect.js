import { useEffect, useState } from "react";
import { Contract, ContractFactory, ethers } from "ethers";
import { shortenText } from "@/utils/projectDetails";
import { useRouter } from "next/navigation";
import { data } from "@/constants/FairFlowData";
import { deployContract } from "@/axios";

const ConnectButton = ({ projectData }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedProvider, setConnectedProvider] = useState();
  const [sendStatus, setSendStatus] = useState("false");
  const [signer, setSigner] = useState();
  const router = useRouter();

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
    setSendStatus("processing");
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
      res ? setSendStatus("done") : setSendStatus("failed");
    } catch (error) {
      console.log("Error! Details: ", error);
      setSendStatus("failed");
    }
  }

  function goHome() {
    router.push(`/projects`);
  }

  return (
    <div>
      {isConnected ? (
        <div>
          <p
            style={{ marginBottom: "10px" }}
          >{`Connected to Metamask wallet with address ${shortenText(signer.address, 12)}!`}</p>
          <button
            type="submit"
            onClick={sendStatus === "false" ? createProject : goHome}
            className="submitButton"
            disabled={sendStatus === "processing"}
            style={{ width: "100%" }}
          >
            {sendStatus === "false" ? (
              "Create Project"
            ) : sendStatus === "processing" ? (
              "Processing..."
            ) : sendStatus === "done" ? (
              <>
                Project Created
                <br />
                <br />
                Go Home
              </>
            ) : sendStatus === "failed" ? (
              <>
                An error has occurred!
                <br />
                <br />
                Go Home.
              </>
            ) : (
              <>
                An error has occurred!
                <br />
                <br />
                Go Home.
              </>
            )}
          </button>
        </div>
      ) : (
        <button
          type="submit"
          className="submitButton"
          onClick={connect}
          style={{ width: "100%" }}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectButton;
