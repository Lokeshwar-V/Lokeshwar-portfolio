"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";

const projectsData = [
  {
    id: 1,
    title: "Customised AI Agent — Milvus & SQL Retrieval",
    description:
      "Production AI retrieval agent combining Milvus vector search and PostgreSQL for semantic and structured querying over enterprise datasets.",
    image: "",
    tag: ["All", "AI-Data"],
    gitUrl: "#",
    previewUrl: "#",
    internal: true,
  },
  {
    id: 2,
    title: "Automated GenAI Document Processing Pipeline",
    description:
      "End-to-end document ingestion from Azure Blob Storage with extraction, chunking, embeddings, and synchronized Milvus index updates.",
    image: "",
    tag: ["All", "AI-Data"],
    gitUrl: "#",
    previewUrl: "#",
    internal: true,
  },
  {
    id: 3,
    title: "Modern 3D Portfolio",
    description:
      "A Next.js + Three.js personal website with smooth scrolling, interactive 3D hero, and glassmorphism UI.",
    image: "/images/projects/1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Lokeshwar-V/Lokeshwar-portfolio.git",
    previewUrl: "#",
  },
  {
    id: 4,
    title: "Anime Discovery Website",
    description:
      "Content browsing website with filtering, API-based data retrieval, and responsive Next.js UI.",
    image: "/images/projects/7.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Lokeshwar-V/Anime-website",
    previewUrl: "https://anime-website-ten.vercel.app/",
  },
  {
    id: 5,
    title: "BMI Calculator — Flutter",
    description:
      "Cross-platform mobile application for BMI analysis with intuitive design and contextual health indicators.",
    image: "/images/projects/5.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/Lokeshwar-V/BMI-Calculator-Flutter.git",
    previewUrl: "https://www.amazon.com/gp/product/B092HKLC6Z",
  },
  {
    id: 6,
    title: "Clima — Flutter Weather",
    description:
      "Flutter weather application using OpenWeatherMap data with clean architecture and reusable UI widgets.",
    image: "/images/projects/6.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/Lokeshwar-V/Clima-Flutter.git",
    previewUrl: "#",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const filteredProjects = projectsData.filter((project) => project.tag.includes(tag));

  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="py-14">
      <h2 className="section-title mb-8 text-center text-white">
        Featured <span className="neon-text">Projects</span>
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-2 py-4">
        {["All", "AI-Data", "Web", "Mobile"].map((name) => (
          <ProjectTag key={name} onClick={setTag} name={name} isSelected={tag === name} />
        ))}
      </div>

      <ul ref={ref} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              internal={project.internal}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
