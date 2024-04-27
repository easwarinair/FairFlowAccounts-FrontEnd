"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useLocation } from "react-router-dom";

import "./styles.css";

export default function Page() {
  const { id } = useParams();
  const location = useLocation();
  console.log("Received data:", location.state);
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
      </header>
      <main>
        <div className="rectangle-container">
          <div className="rounded-rectangle"></div>
        </div>
        <h3 className="block-heading">Block #{id}</h3>
        <h4 className="block-details">Details</h4>
      </main>
    </>
  );
}
