"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import getConstants from "@/constants/FairFlow";
import { data } from "@/constants/FairFlowData";
import ConnectButton from "@/components/Connect";

const CreateProject = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    phases: [""],
    cost: "",
  });

  const [phaseCount, setPhaseCount] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handlePhaseChange = (index, value) => {
    const newPhases = [...project.phases];
    newPhases[index] = value;
    setProject({ ...project, phases: newPhases });
  };

  const addPhase = () => {
    setProject({ ...project, phases: [...project.phases, ""] });
    setPhaseCount(phaseCount + 1);
  };
  const removePhase = () => {
    if (project.phases.length > 0) {
      const newPhases = project.phases.slice(0, project.phases.length - 1);
      setProject({ ...project, phases: newPhases });
      setPhaseCount(phaseCount - 1);
    }
  };

  const submitProject = (e) => {
    e.preventDefault();
    console.log(project);
  };

  async function deployContract() {
    const signer = getSigner();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        <span className={styles.fairflow}>FairFlow</span>
        <span className={styles.accounts}>Accounts</span>
      </h1>
      <h2 className={styles.subheader}>Create a new project</h2>

      <form onSubmit={submitProject} className={styles.form}>
        <label className={styles.label}>
          Project Title
          <input
            type="text"
            name="title"
            required
            value={project.title}
            onChange={handleInputChange}
            className={styles.input}
            style={{ fontFamily: "Inter" }}
          />
        </label>

        <label className={styles.label}>
          Project Description
          <textarea
            name="description"
            required
            value={project.description}
            onChange={handleInputChange}
            className={styles.textarea}
            style={{ fontFamily: "Inter" }}
          />
        </label>
        <div className={styles.phases}>
          <label className={styles.label}>Project Phases</label>
          {project.phases.map((phase, index) => (
            <input
              type="text"
              key={index}
              value={phase}
              required
              onChange={(e) => handlePhaseChange(index, e.target.value)}
              placeholder={`Phase #${index + 1}`}
              className={styles.input}
              style={{ fontFamily: "Inter" }}
            />
          ))}
          <button
            type="button"
            onClick={addPhase}
            className={styles.addButton}
            style={{ marginRight: "10px" }}
          >
            +
          </button>
          {phaseCount > 1 ? (
            <button
              type="button"
              onClick={removePhase}
              className={styles.addButton}
            >
              -
            </button>
          ) : (
            <div></div>
          )}
        </div>

        <label className={styles.label}>
          Expected Cost (in ETH)
          <input
            type="text"
            name="cost"
            required
            value={project.cost}
            onChange={handleInputChange}
            className={styles.input}
            style={{ fontFamily: "Inter" }}
          />
        </label>
        <ConnectButton projectData={project} />
      </form>
    </div>
  );
};
export default CreateProject;
