"use client";

import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Packaged Application Development Analyst",
    company: "Accenture India, Chennai",
    period: "Mar 2026 – Present",
    bullets: [
      "Design and manage scalable data pipelines for ingesting and retrieving enterprise datasets using Python and SQL.",
      "Develop AI retrieval agents across Milvus and PostgreSQL to improve relevance and reduce manual lookups.",
      "Optimize vector indexing and retrieval logic, improving semantic search accuracy and reducing latency by up to 30%.",
    ],
  },
  {
    role: "Packaged Application Development Associate",
    company: "Accenture India, Chennai",
    period: "Apr 2024 – Mar 2026",
    bullets: [
      "Built ETL pipelines processing 500K+ records per run with validation checks for end-to-end quality.",
      "Engineered ingestion workflows for SQL + Milvus, reducing ingestion time by up to 25%.",
      "Integrated Teams-triggered Azure Logic Apps and App Service APIs, saving around 20 hours/week.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "NYL Technology, Chennai",
    period: "Dec 2023 – Apr 2024",
    bullets: [
      "Contributed to backend API development and data processing tasks using Python and REST APIs.",
      "Supported debugging, testing, and documentation workflows, saving around 9 hours/week.",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-14">
      <h2 className="section-title mb-8 text-white">
        Professional <span className="neon-text">Experience</span>
      </h2>

      <div className="relative border-l border-slate-700/70 pl-6 md:pl-8">
        {experiences.map((exp, idx) => (
          <motion.article
            key={exp.role}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: idx * 0.1 }}
            className="glass-card relative mb-6 p-5 md:p-6"
          >
            <span className="absolute -left-[39px] top-6 block h-4 w-4 rounded-full border-2 border-secondary-400 bg-surface md:-left-[47px]" />
            <p className="mb-1 text-sm text-secondary-300">{exp.period}</p>
            <h3 className="text-lg font-bold text-white md:text-xl">{exp.role}</h3>
            <p className="mb-4 text-sm text-slate-400">{exp.company}</p>
            <ul className="list-disc space-y-2 pl-4 text-sm leading-relaxed text-slate-300">
              {exp.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
