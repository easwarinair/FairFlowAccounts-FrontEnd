"use client"

import { useState } from "react";
import "./login.css";
import { LoginAPICall } from "@/axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

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
  };
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
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" style={{fontWeight: 'bold'}}>Email:</label>
              <input
                type="text"
                id="name"
                name="username"
                placeholder="Enter your email address"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{fontWeight: 'bold'}}>Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <a className="link" style={{ color: "#CA047B" , fontWeight:'bold'}} href="/signup">
              SignUp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}