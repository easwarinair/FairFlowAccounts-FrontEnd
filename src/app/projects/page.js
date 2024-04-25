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
        getProjects().then((response) => {
            console.log(response.data);
            setProjects(response.data);
            setLoading(false);
        });
    }, []);

    const onProjectClick = (id) => {
        route.push(`/projects/${id}`);
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

                    <div className="welcome">Welcome!</div>
                </div>
                {/* <div className="search-bar">
                    <input type="text" style={{ fontWeight: "bold" }} placeholder="Search transactions by block number, date, or more..." />
                </div> */}
            </header>
            <div className="project">
                {loading && <div className="loading_text">Loading...</div>}
                {projects.map((project) => {
                    return (
                        <div key={project.id} onClick={() => onProjectClick(project.contractAddress)}>
                            <div className="rectangle-container">
                                <div className="rounded-rectangle">
                                    <h3 className="block-heading">{project.projectTitle}</h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
