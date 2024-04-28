"use client";

import {useState } from "react";
import "./styles.css";
import { useRouter } from "next/navigation";

export default function Page() {

   const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter(); 

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery && !isNaN(searchQuery)) {
      const blockId = parseInt(searchQuery, 10);
      if (blockId > 0 && blockId <= blockCount) {
        router.push(`/blocks/${blockId}`);
      } else {
        alert("Block number out of range");
      }
    } else {
      alert("Please enter a valid block number");
    }
  };
  
  return (
    <>
      <header className="header">
        <div className="logo">
          <a href="/home">
            <span className="mag">FairFlow</span>
            <br />
            <span className="black">Accounts</span>
          </a>
        </div>
       <div className="search-bar">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  style={{ fontWeight: "bold" }}
                  placeholder="Search transactions by block number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
          
              </form>
            </div>
      </header>
      <main>
        <div className="rectangle-container">
          <div className="rounded-rectangle"></div>
        </div>
        <h3 className="block-heading">Block #1</h3>
        <h4 className="block-details">Details</h4>
      </main>
    </>
  );
}
