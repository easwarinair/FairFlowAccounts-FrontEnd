"use client"

import axios from "axios";
import "../login/login.css";

export default function Page() {
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const username=e.target.username.value;
    const password=e.target.password.value;

    try{
      const response = await axios.post('/signup', {username,password});
      if(response.status===201){
        alert('User registered successfully');
        window.location.href='/login';
      }
    } catch(error){
      if (error.response && error.response.status === 409) {
        alert('User already exists. Please choose a different username.');
      } else {
        alert('An error occurred during signup.');
      }
    }
  };
  return (
    <div class="container">
      <div class="left-panel">
        <span>
          <h1 class="mag">FairFlow</h1>
          <br />
        </span>
        <span>
          <h2 class="black">Accounts</h2>
        </span>
        <div class="block-container">
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
        </div>
      </div>

      <div class="partition-line"></div>
      <div class="right-panel">
        <div class="welcome">
          {" "}
          <h2>Sign Up</h2>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}/>
          <form action="/signup" method="post">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="username"
                placeholder="Enter your name"
                required
                autocomplete="off"
              />
            </div>
            <div className="form-group">
              <label fhtmlFor="password">password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
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
                style={{ color: "#CA047B" }}
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
