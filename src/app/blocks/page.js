"use client";

import { useState } from "react";
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
      <div className="logo">
        <a href="../home.html">
          <span className="mag">FairFlow</span>
          <br></br>
          <span className="black">Accounts</span>
        </a>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search transactions by block number, date, or more..."
        ></input>
      </div>
      <a href="block48.html" className="next-arrow">
        &rarr;
      </a>
      <main>
        <div className="rectangle-container">
          <div className="rounded-rectangle"></div>
        </div>
        <h3 className="block-heading">Block #49</h3>
        <h2 className="block-subheading">
          created on 29-10-2023 at 23:55 by @bobkuruvila
        </h2>
        <h4 className="block-details">Details</h4>
      </main>
    </>
  );
}
