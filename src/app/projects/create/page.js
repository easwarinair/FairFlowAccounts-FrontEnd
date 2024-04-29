"use client"
import React, { useState } from 'react';
import styles from './styles.module.css';

const CreateProject = () => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    phases: [''],
    cost: ''
  });

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
    setProject({ ...project, phases: [...project.phases, ''] });
  };

  

  const submitProject = (e) => {
    e.preventDefault();
    console.log(project);
    
  };

  return (
    <div className={styles.container}>
       <h1 className={styles.header}>
        <span className={styles.fairflow}>FairFlow   </span>
        <span className={styles.accounts}>Accounts</span>
      </h1>
      <h2 className={styles.subheader}>Create a new project</h2>

      <form onSubmit={submitProject} className={styles.form}>
        <label className={styles.label}>
          Project Title
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Project Description
          <textarea
            name="description"
            value={project.description}
            onChange={handleInputChange}
            className={styles.textarea}
          />
        </label>
        <div className={styles.phases}>
          <label className={styles.label}>Project Phases</label>
          {project.phases.map((phase, index) => (
            <input
              type="text"
              key={index}
              value={phase}
              onChange={(e) => handlePhaseChange(index, e.target.value)}
              placeholder={`Phase #${index + 1}`}
              className={styles.input}
            />
          ))}
          <button type="button" onClick={addPhase} className={styles.addButton}>+</button>
        </div>

        <label className={styles.label}>
          Expected Cost (in Rupees)
          <input
            type="text"
            name="cost"
            value={project.cost}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default CreateProject;