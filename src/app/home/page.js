"use client"
import "./home.css"
import { useEffect, useState } from "react";

export default function Page() {

  const [statuses, setStatuses] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [loading, setLoading] = useState("loading");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading("loading");
        const res = await ProjectStatusAPICall();
        if (res.status === 200 && res.data.result) {
          setLoading("success");  
          setProjectTitle(res.data.result[0].projectTitle);
          setStatuses(res.data.result);
        } else setLoading("error");
      } catch (err) {
        console.log(err);
        setLoading("error");
      }
    };

    fetchData();
  }, []);

  console.log(statuses);
  return (
    <>
      <header className="header">
        <div className="logo">
          <span className="mag">FairFlow</span>
          <br />
          <span className="black">Accounts</span>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search transactions by block number, date, or more..."
          />
        </div>
        <div className="login-button">
          <a href="/login">
            <button>Login</button>
          </a>
          <br />
        </div>
      </header>
      <main>
        <h1 className="project-title">
          {projectTitle || "Loading..."}
        </h1>
        <div className="project-details">
          <span>Progress</span>
          <span>Current Expenditure</span>
          <span>Expected Cost</span>
          <span>Latest Update</span>
        </div>
        <div className="project-details_1">
          <span>63%</span>
          <span>2.85 Cr</span>
          <span>6 Cr</span>
          <span>Phase 5/8</span>
        </div>
        {/* <button id="deployBtn">Deploy Contract</button> */}
        <h3 className="project-subheading">Latest Transactions</h3>
        <div className="rectangle-container">
          <a href="blocks/block49.html" className="rounded-rectangle">
            <span className="block-number">#49</span>
          </a>
          <a href="blocks/block48.html" className="rounded-rectangle">
            <span className="block-number">#48</span>
          </a>
          <a href="blocks/block47.html" className="rounded-rectangle">
            <span className="block-number">#47</span>
          </a>
          <a href="blocks/block46.html" className="rounded-rectangle">
            <span className="block-number">#46</span>
          </a>
          <a href="blocks/block45.html" className="rounded-rectangle">
            <span className="block-number">#45</span>
          </a>
          <a href="blocks/block44.html" className="rounded-rectangle">
            <span className="block-number">#44</span>
          </a>
          <a href="blocks/block43.html" className="rounded-rectangle">
            <span className="block-number">#43</span>
          </a>
          <a href="blocks/block42.html" className="rounded-rectangle">
            <span className="block-number">#42</span>
          </a>
        </div>

        <hr />
        <div className="project-status" id="project_status">
          Project status
          <p id="project_data"></p>
        </div>
        <hr />

        <div className="transaction-details">
          <span>Block No</span>
          <span>Amount</span>
          <span>Sender ID</span>
          <span>Receiver ID</span>
          <span>Timestamp</span>
        </div>
        <div className="transaction-details_1">
          <span>49</span>
          <span>Rs 48,000</span>
          <span>
            <a href="profiles/bobkuruvila.html" className="profile-link">
              <u>@bobkuruvila</u>
            </a>
          </span>
          <span>
            <a href="profiles/profile.html" className="profile-link">
              <u>@alexfranko</u>
            </a>
          </span>
          <span>29-10-2023 23:55</span>
        </div>
        <div className="transaction-details_1">
          <span>48</span>
          <span>Rs 50,000</span>
          <span>
            <a href="profiles/bobkuruvila.html" className="profile-link">
              <u>@bobkuruvila</u>
            </a>
          </span>
          <span>
            <a href="profiles/crsinolan.html" className="profile-link">
              <u>@crisnolan</u>
            </a>
          </span>
          <span>30-10-2023 10:00</span>
        </div>
        <div className="transaction-details_1">
          <span>47</span>
          <span>Rs 1,80,000</span>
          <span>
            <a href="profiles/alexfranko.html" className="profile-link">
              <u>@alexfranko</u>
            </a>
          </span>
          <span>
            <a href="profiles/crsinolan.html" className="profile-link">
              <u>@crisnolan</u>
            </a>
          </span>
          <span>30-10-2023 13:56</span>
        </div>
        <div className="transaction-details_1">
          <span>46</span>
          <span>Rs 2,00,000</span>
          <span>
            <a href="profiles/bobkuruvila.html" className="profile-link">
              <u>@bobkuruvila</u>
            </a>
          </span>
          <span>
            <a href="profiles/crsinolan.html" className="profile-link">
              <u>@crisnolan</u>
            </a>
          </span>
          <span>01-11-2023 14:45</span>
        </div>
        <div className="transaction-details_1">
          <span>45</span>
          <span>Rs 30,000</span>
          <span>
            <a href="profiles/crsinolan.html" className="profile-link">
              <u>@crisnolan</u>
            </a>
          </span>
          <span>
            <a href="profiles/alexfranko.html" className="profile-link">
              <u>@alexfranko</u>
            </a>
          </span>
          <span>14-11-2023 09:45</span>
        </div>
        <div className="transaction-details_1">
          <span>44</span>
          <span>Rs 50,000</span>
          <span>
            <a href="profiles/bobkuruvila.html" className="profile-link">
              <u>@bobkuruvila</u>
            </a>
          </span>
          <span>
            <a href="profiles/crsinolan.html" className="profile-link">
              <u>@crisnolan</u>
            </a>
          </span>
          <span>14-11-2023 09:45</span>
        </div>
        <div className="transaction-details_1">
          <span>43</span>
          <span>Rs 3,00,000</span>
          <span>
            <a href="profiles/bobkuruvila.html" className="profile-link">
              <u>@bobkuruvila</u>
            </a>
          </span>
          <span>
            <a href="profiles/alexfranko.html" className="profile-link">
              <u>@alexfranko</u>
            </a>
          </span>
          <span>20-11-2023 17:45</span>
        </div>
        <div className="transaction-details_1">
          <span>42</span>
          <span>Rs 4,00,000</span>
          <span>
            <a href="profiles/bobkuruvila.html" className="profile-link">
              <u>@bobkuruvila</u>
            </a>
          </span>
          <span>
            <a href="profiles/alexfranko.html" className="profile-link">
              <u>@alexfranko</u>
            </a>
          </span>
          <span>28-11-2023 08:00</span>
        </div>
      </main>
    </>
  );
}
