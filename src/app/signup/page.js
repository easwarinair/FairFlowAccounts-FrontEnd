"use client"

import { useRouter } from "next/navigation";
import "../login/login.css";
import { RegisterAPICall } from "@/axios";

export default function Page() {
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await RegisterAPICall({username, password});
      if (response.status === 201) {
        alert('User registered successfully');
        router.push('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('User already exists. Please choose a different username.');
      } else {
        alert('An error occurred during signup.');
      }
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <span>
          <h1 className="mag">FairFlow</h1>
          <br />
        </span>
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
          <h2>Sign Up!</h2>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" style={{ fontWeight: 'bold' }}>Name:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your name"
                required
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="submit">
              Submit
            </button>
            <p>
              Already have an account?
              <a
                className="link"
                style={{ color: "#CA047B", fontWeight: 'bold' }}
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

