"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { getProjects } from "@/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import LoginButton from "@/components/LoginButton";
import { showErrorToast } from "@/utils/toast";

export default function Page() {
  const { signedIn, checkSignedIn } = useUserContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      checkSignedIn();
      getProjects()
        .then((response) => {
          console.log(response.data);
          setProjects(response.data);
          setLoading(false);
        })
        .catch((err) => {
          showErrorToast(err.message || "Failed to fetch projects.");
        });
    };

    fetchData();
  }, []);

  const onProjectClick = (id, hash) => {
    route.push(`/projects/${id}/${hash}`);
  };

  return (
    <>
      <header className="headers">
        <div className="logo">
          <Link href="/projects" className="logo">
            <span className="mag">FairFlow</span>
            <span className="black">Accounts</span>
          </Link>
        </div>
        <LoginButton />
      </header>
      <div className="center">
        <div className="welcome">Welcome!</div>
        {signedIn.status && signedIn.authLevel === 0 && (
          <div className="creator_container">
            <span className="select_text">Create a project!</span>
            <Link href="/projects/create" className="creator-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ca047b"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </Link>
            <span className="select_text">OR</span>
          </div>
        )}
        <span className="select_text">Select a project to continue</span>
        <div className="project">
          {loading && <div className="loading_text">Loading...</div>}
          {projects.map((project, index) => {
            return (
              <div
                className="project_card"
                key={index}
                onClick={() =>
                  onProjectClick(project.contractAddress, project.txHash)
                }
              >
                <h3 className="block-heading">{project.projectTitle}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
