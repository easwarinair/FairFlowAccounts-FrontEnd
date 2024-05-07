"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "../login/login.module.css";

import { RegisterAPICall } from "@/axios";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      showErrorToast("Passwords do not match. Please try again.");
      return;
    }
    setLoading(true);
    try {
      const response = await RegisterAPICall({ name, email, password });
      setLoading(false);
      if (response.status === 201) {
        showSuccessToast("User registered successfully");
        router.push("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setLoading(false);
      if (error.response && error.response.status === 409) {
        showErrorToast("User already exists. Please choose a different email.");
      } else {
        showErrorToast("An error occurred during signup.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_panel}>
        <span>
          <h1 className={styles.mag}>FairFlow</h1>
          <br />
        </span>
        <span>
          <h2 className={styles.black}>Accounts</h2>
        </span>
        <div className={styles.block_container}>
          <div className={styles.block}></div>
          <div className={styles.block}></div>
          <div className={styles.block}></div>
        </div>
      </div>

      <div className={styles.partition_line}></div>
      <div className={styles.right_panel}>
        <div className={styles.welcome}>
          <h2>Sign Up!</h2>
        </div>

        <div className={styles.form_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <label htmlFor="name" style={{ fontWeight: "bold" }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="email" style={{ fontWeight: "bold" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="password" style={{ fontWeight: "bold" }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="retypePassword" style={{ fontWeight: "bold" }}>
                Retype Password
              </label>
              <input
                type="password"
                id="retypePassword"
                name="retypePassword"
                placeholder="Retype your password"
                required
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className={styles.submit_btn}
              disabled={loading}
            >
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <a
                className={styles.link}
                style={{ color: "#CA047B", fontWeight: "bold" }}
                href="/login"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
