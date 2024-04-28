"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { getProjects } from "@/axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  useEffect(() => {
    setLoading(true);
    console.log(
      "Inside useEffect of projects page, trying to get project data..."
    );
    getProjects().then((response) => {
      console.log(response.data);
      setProjects(response.data);
      setLoading(false);
    });
  }, []);

  const onProjectClick = (id, hash) => {
    route.push(`/projects/${id}/${hash}`);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <a href="/home">
            <span className="mag">FairFlow</span>
            {/* <br /> */}
            <span className="black">Accounts</span>
          </a>
        </div>
        <div className="welcome">Welcome!</div>
        <span className="select_text">Select a project to continue!</span>
      </header>
      <div className="project">
        {loading && <div className="loading_text">Loading...</div>}
        {projects.map((project) => {
          console.log("building project:", project);
          return (
            <div
              className="project_card"
              key={project.id}
              onClick={() => onProjectClick(project.contractAddress, project.txHash)}
            >
              <h3 className="block-heading">{project.projectTitle}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}
