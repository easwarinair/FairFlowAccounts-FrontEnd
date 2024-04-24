"use client";

import {useState } from "react";
import "./styles.css";

export default function Page() {
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
        <h3 className="block-heading">Block #1</h3>
        <h4 className="block-details">Details</h4>
      </main>
    </>
  );
}
