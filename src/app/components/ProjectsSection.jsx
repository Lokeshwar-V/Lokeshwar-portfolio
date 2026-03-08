"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";

const projectsData = [
  {
    id: 1,
    title: "Customized AI Agent with Milvus & SQL Retrieval",
    description:
      "Built a prompt-driven AI agent that performs tool-calling across Milvus vector search and SQL retrieval, then returns citation-backed answers for reliable enterprise usage.",
    image: "",
    tag: ["All", "AI & Data"],
    gitUrl: "#",
    previewUrl: "#",
    internal: true,
    dateLabel: "Nov 2025 - Present",
    sortKey: 202511,
    organization: "Accenture, India",
    flow:
      "Extract -> Store -> Transform -> Embed -> Ingest -> Prompt -> Tool Calling -> Retrieval -> Response with Citations",
    tools: ["Python", "Milvus", "SQL", "Semantic Search", "AI Agents"],
    featured: true,
  },
  {
    id: 2,
    title: "Automated GenAI Document Processing Pipeline",
    description:
      "Automated the full ingestion flow from Blob Storage to Milvus with PDF conversion, GPT summarization, chunking, embeddings, metadata enrichment, and daily delta synchronization.",
    image: "",
    tag: ["All", "AI & Data"],
    gitUrl: "#",
    previewUrl: "#",
    internal: true,
    dateLabel: "Nov 2025",
    sortKey: 202511,
    organization: "Accenture, India",
    flow:
      "Extract -> Store -> Transform -> Embed -> Ingest -> Prompt -> Tool Calling -> Retrieval -> Response with Citations",
    tools: ["Python", "Azure Blob Storage", "GPT", "Milvus", "Vector Embeddings"],
    featured: true,
  },
  {
    id: 3,
    title: "Data Automation Engineer | Python Developer | Vector Database Integration",
    description:
      "Developed an end-to-end Python automation pipeline that ingests high-volume datasets, transforms them with pandas, and inserts vectorized outputs into Milvus for fast similarity retrieval.",
    image: "",
    tag: ["All", "Automation"],
    gitUrl: "#",
    previewUrl: "#",
    internal: true,
    dateLabel: "Oct 2024 - Oct 2025",
    sortKey: 202410,
    organization: "Accenture, India",
    flow: "Extract -> Transform -> Embed -> Ingest",
    tools: ["Python", "pandas", "Milvus", "Cron Jobs"],
    featured: true,
  },
  {
    id: 4,
    title: "Azure DevOps Workflow Automation Engineer",
    description:
      "Automated Azure DevOps taskboard lifecycle with daily task creation, stale-task closure, monthly story initialization, and weekly recap emails using Python plus Logic Apps.",
    image: "",
    tag: ["All", "Automation"],
    gitUrl: "#",
    previewUrl: "#",
    internal: true,
    dateLabel: "Apr 2025",
    sortKey: 202504,
    organization: "Accenture, India",
    tools: ["Python", "Azure DevOps API", "Azure Logic Apps", "Workflow Automation"],
    featured: true,
  },
  {
    id: 5,
    title: "AI Assistant for Manual and Automation Testing",
    description:
      "Designed an assistant-oriented workflow to support test case preparation, execution support, and faster QA feedback loops for manual and automation teams.",
    image: "",
    tag: ["All", "AI & Data"],
    gitUrl: "#",
    previewUrl: "#",
    internal: true,
    dateLabel: "Mar 2024 - Apr 2024",
    sortKey: 202403,
    organization: "NYL Technology",
    tools: ["Python", "NLP", "Prompt Engineering", "QA Automation"],
    featured: true,
  },
  {
    id: 6,
    title: "GMeet Summarizer",
    description:
      "Created a meeting intelligence flow where Google Meet transcriptions stream through Pub/Sub and are summarized by ChatGPT for concise post-meeting outcomes.",
    image: "",
    tag: ["All", "AI & Data"],
    gitUrl: "#",
    previewUrl: "#",
    internal: true,
    dateLabel: "Feb 2024",
    sortKey: 202402,
    organization: "NYL Technology",
    tools: ["Google Workspace", "Google Meet", "Google Pub/Sub", "ChatGPT"],
    featured: true,
  },
  {
    id: 7,
    title: "API-OAuth-Pinecone-LangChain | AI Chatbot",
    description:
      "Integrated OAuth-protected APIs with LangChain pipelines and Pinecone indexing to support secure, context-aware conversational retrieval.",
    image: "",
    tag: ["All", "AI & Data"],
    gitUrl: "#",
    previewUrl: "#",
    internal: true,
    dateLabel: "Jan 2024",
    sortKey: 202401,
    organization: "NYL Technology",
    tools: ["LangChain", "OAuth 2.0", "Pinecone", "OpenAI"],
    featured: false,
  },
  {
    id: 8,
    title: "Flask-Pinecone-LangChain | AI Chatbot",
    description:
      "Built a Python Flask chatbot with LangChain and Pinecone for retrieval-based question answering, backed by NLP-driven text processing.",
    image: "",
    tag: ["All", "AI & Data"],
    gitUrl: "#",
    previewUrl: "#",
    internal: true,
    dateLabel: "Dec 2023 - Jan 2024",
    sortKey: 202312,
    organization: "NYL Technology",
    tools: ["Flask", "LangChain", "Pinecone", "spaCy"],
    featured: false,
  },
  {
    id: 9,
    title: "OpenAI + Pinecone Semantic Retrieval Demo",
    description:
      "Implemented a semantic retrieval demo that stores embeddings in Pinecone and uses OpenAI to generate context-aware responses beyond keyword search.",
    image: "",
    tag: ["All", "AI & Data"],
    gitUrl: "#",
    previewUrl: "#",
    internal: false,
    dateLabel: "Dec 2023",
    sortKey: 202312,
    organization: "Personal Project",
    tools: ["OpenAI", "Pinecone", "Embeddings", "Semantic Search"],
    featured: false,
  },
  {
    id: 10,
    title: "To Do List Web App",
    description:
      "Developed a CRUD task manager with status tracking, editing, and deletion capabilities using modern JavaScript frameworks and a database-backed API.",
    image: "",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Lokeshwar-V/To-do-List",
    previewUrl: "#",
    internal: false,
    dateLabel: "Dec 2023",
    sortKey: 202312,
    organization: "Personal Project",
    tools: ["React", "Express.js", "MongoDB", "JavaScript"],
    featured: false,
  },
  {
    id: 11,
    title: "Anime Website",
    description:
      "Built a responsive Next.js anime catalog with API-driven listings, popularity/rating sorting, and animated UI interactions.",
    image: "/images/projects/7.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Lokeshwar-V/Anime-website",
    previewUrl: "https://anime-website-ten.vercel.app/",
    internal: false,
    dateLabel: "Nov 2023",
    sortKey: 202311,
    organization: "Personal Project",
    tools: ["Next.js", "Framer Motion", "Shikimori API", "Vercel"],
    featured: true,
  },
  {
    id: 12,
    title: "Climate Card (Weather Card Using API)",
    description:
      "Created a weather dashboard that fetches real-time climate data and dynamically adapts visuals to current weather conditions.",
    image: "",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Lokeshwar-V/climate-card.git",
    previewUrl: "#",
    internal: false,
    dateLabel: "Oct 2023",
    sortKey: 202310,
    organization: "Personal Project",
    tools: ["React", "OpenWeatherMap API", "Unsplash API", "CSS"],
    featured: false,
  },
  {
    id: 13,
    title: "Lokeshwar Portfolio",
    description:
      "Designed and shipped a personal Next.js portfolio with SEO-friendly pages, smooth interactions, and animated number counters.",
    image: "/images/projects/1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Lokeshwar-V/Lokeshwar-portfolio.git",
    previewUrl: "#",
    internal: false,
    dateLabel: "Sep 2023",
    sortKey: 202309,
    organization: "Personal Project",
    tools: ["Next.js", "Framer Motion", "React", "Frontend Development"],
    featured: false,
  },
  {
    id: 14,
    title: "BMI Calculator (Flutter)",
    description:
      "Built a cross-platform Flutter app that computes BMI instantly and presents health ranges with clear, color-coded guidance.",
    image: "/images/projects/5.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/Lokeshwar-V/BMI-Calculator-Flutter.git",
    previewUrl: "https://www.amazon.com/gp/product/B092HKLC6Z",
    internal: false,
    dateLabel: "Apr 2021",
    sortKey: 202104,
    organization: "Personal Project",
    tools: ["Flutter", "Dart", "Android", "Mobile UI"],
    featured: false,
  },
];

const FILTERS = ["All", "AI & Data", "Automation", "Web", "Mobile"];
const ARCHIVE_PAGE_SIZE = 6;

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [visibleArchiveCount, setVisibleArchiveCount] = useState(ARCHIVE_PAGE_SIZE);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const sortedProjects = [...projectsData].sort((a, b) => b.sortKey - a.sortKey || a.id - b.id);
  const filteredProjects = sortedProjects.filter((project) => project.tag.includes(tag));
  const featuredProjects = filteredProjects.filter((project) => project.featured).slice(0, 8);
  const archiveProjects = filteredProjects;
  const visibleArchiveProjects = archiveProjects.slice(0, visibleArchiveCount);
  const hasMoreArchive = visibleArchiveCount < archiveProjects.length;

  const handleFilterChange = (name) => {
    setTag(name);
    setVisibleArchiveCount(ARCHIVE_PAGE_SIZE);
  };

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
        {FILTERS.map((name) => (
          <ProjectTag key={name} onClick={handleFilterChange} name={name} isSelected={tag === name} />
        ))}
      </div>

      <ul ref={ref} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.35, delay: Math.min(index * 0.08, 0.36) }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              internal={project.internal}
              dateLabel={project.dateLabel}
              organization={project.organization}
              flow={project.flow}
              tools={project.tools}
            />
          </motion.li>
        ))}
      </ul>

      <div className="mt-12">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-bold text-white">Project Archive</h3>
          <button
            className="rounded-full border border-primary-400/40 bg-primary-500/10 px-4 py-2 text-sm font-semibold text-primary-200 transition hover:bg-primary-500/20"
            onClick={() => setArchiveOpen((prev) => !prev)}
          >
            {archiveOpen ? "Hide Archive" : "Show Full Timeline"}
          </button>
        </div>

        {archiveOpen && (
          <>
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleArchiveProjects.map((project, index) => (
                <motion.li
                  key={`archive-${project.id}`}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.25) }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    imgUrl={project.image}
                    gitUrl={project.gitUrl}
                    previewUrl={project.previewUrl}
                    internal={project.internal}
                    dateLabel={project.dateLabel}
                    organization={project.organization}
                    flow={project.flow}
                    tools={project.tools}
                  />
                </motion.li>
              ))}
            </ul>

            {hasMoreArchive && (
              <div className="mt-6 flex justify-center">
                <button
                  className="rounded-full border border-secondary-400/40 bg-secondary-500/10 px-5 py-2.5 text-sm font-semibold text-secondary-200 transition hover:bg-secondary-500/20"
                  onClick={() => setVisibleArchiveCount((prev) => prev + ARCHIVE_PAGE_SIZE)}
                >
                  Load More Projects
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
