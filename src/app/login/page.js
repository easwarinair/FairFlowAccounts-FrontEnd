"use client"

import { useState } from "react";
import "./login.css";
import { LoginAPICall } from "@/axios";
import { useRouter } from "next/router";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState(1); // 1 for email only, 2 for password input, 3 for full signup
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  
  const checkEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/check-email?email=${email}`);
      setLoading(false);
      if (response.data.exists) {
        setStage(2); // Move to password stage
      } else {
        setStage(3); // Move to signup stage
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
        router.push(`/profile?user=${res.data.id}`); // Automatically login after signup
      } else {
        alert("Error signing up");
      }
    } catch (err) {
      console.error("Error signing up:", err);
      setLoading(false);
      alert("An error occurred during signup.");
    }
  };



  /*const handleSubmit =async (e) => {
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

  return (
    <div className="container">
      <div className="left-panel">
        <div>
          <h1 className="mag">FairFlow</h1>
          <br />
        </div>
        <span>
          <h2 className="black">Accounts</h2>
        </span>
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
          <form onSubmit={stage === 1 ? checkEmail : stage === 2 ? handleLogin : handleSignup}>
            {stage === 1 && (
              <>
                <div className="form-group">
                  <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email:</label>
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
                  <button type="button" onClick={checkEmail} disabled={loading}>
                    Continue
                  </button>
                </div>
              </>
            )}
            {stage !== 1 && (
              <>
                <div className="form-group">
                  <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password:</label>
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
                  {stage === 2 ? 'Login' : 'Sign Up'}
                </button>
              </>
            )}
          </form>
          <p>
            Don't have an account?{" "}
            <a className="link" style={{ color: "#CA047B", fontWeight: 'bold' }} href="/signup">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}