"use client"

import "./profile.css"
import { useSearchParams } from 'next/navigation'

export default function Page() {
 
    const searchParams = useSearchParams()
    const user = searchParams.get('user')
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
            placeholder="Search transactions by block number, date, or more..."
          />
        </div>  
      </header>
      <main>
        <div className="circle-container">
          <a href="../transaction_form/transaction_form.html">
            <div className="circle">
              <img src="profile.png" />
            </div>
          </a>
          <h3 className="profile-name">
            @<span id="username">{user}</span>
          </h3>
        </div>
      </main>
    </>
  );
}
{
  /* <script>
        document.getElementById('username').textContent = new URLSearchParams(window.location.search).get('user');
    </script> */
}
