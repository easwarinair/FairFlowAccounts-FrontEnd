"use client";

import { useState } from "react";
import "./styles.css";
import { useRouter } from 'next/router'; 

export default function Page() {
  const router = useRouter(); 
  const { blockId } = router.query;
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
          <input
            type="text"
            style={{ fontWeight: "bold" }}
            placeholder="Search transactions by block number, date, or more..."
          />
        </div>
      </header>
      
      <main>
        <div className="rectangle-container">
          <div className="rounded-rectangle"></div>
        </div>
        <h3 className="block-heading">Block #{blockId}</h3> 
        <h4 className="block-details">Details</h4>
      </main>
    </>
  );
}
