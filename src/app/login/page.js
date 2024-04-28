"use client";

import { useState } from "react";
import "./login.css";
import { LoginAPICall } from "@/axios";
import { useRouter } from "next/navigation";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      showErrorToast("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await LoginAPICall({ email, password });
      if (res.data.id) {
        showSuccessToast("Logged in successfully.")
        router.push("/projects");
        /*router.push(`/profile?user=${res.data.id}`);*/
      } else if (res.data.message === "Email not found") {
        showErrorToast("Email not found. Please sign up.");
      } else {
        showErrorToast("Invalid credentials");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "An error occurred during login.";
      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1 className="mag">FairFlow</h1>
        <h2 className="black">Accounts</h2>
        <div className="block-container">
          <div className="block"></div>
          <div className="block"></div>
          <div className="block"></div>
        </div>
      </div>

      <div className="partition-line"></div>

      <div className="right-panel">
        <div className="welcome">
          <h2>Welcome!</h2>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" style={{ fontWeight: "bold" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
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
            <button type="submit" className="submit-btn" disabled={loading}>
              Login
            </button>
          </form>
          <br />
          <br />
          <p>
            Don't have an account?{" "}
            <a
              className="link"
              style={{ color: "#CA047B", fontWeight: "bold" }}
              href="/signup"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/*const checkEmail = async () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`/api/check-email?email=${email}`);
      setLoading(false);
      
      if (response.data.exists) {
        setStage(2); // Email exists, move to login stage
      } else {
        setStage(3); // Email doesn't exist, move to signup stage
      }
    } catch (error) {
      console.error("Checking email failed:", error);
      alert("Failed to verify email.");
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/login', { email, password });
      setLoading(false);
      if (res.data.id) {
        router.push(`/profile?user=${res.data.id}`);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setLoading(false);
      alert("An error occurred during login.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/signup', { email, password });
      setLoading(false);
      if (res.status === 201) {
        router.push(`/profile?user=${res.data.id}`); 
      } else {
        alert("Error signing up");
      }
    } catch (err) {
      console.error("Error signing up:", err);
      setLoading(false);
      alert("An error occurred during signup.");
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault()
    try{
      const res = await LoginAPICall({
        username: email, password
      })
      console.log(res)
      if(res.data?.id){
        router.push(`/profile?user=${res.data.id}`)
      }else{
        alert("Error logging in")
      }
    }catch(err){
      console.log(err)
    }
  };*/
