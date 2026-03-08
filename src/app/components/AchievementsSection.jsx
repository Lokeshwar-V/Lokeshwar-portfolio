"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Experience", value: "2+ Years" },
  { label: "Records per Pipeline", value: "500K+" },
  { label: "Retrieval Latency Improvement", value: "30%" },
  { label: "Ops Time Saved", value: "20 hrs / week" },
];

const badges = [
  "Star of the Month — Accenture (2025)",
  "TechExpressway Merit Holder — Accenture (2024)",
  "Microsoft Certified: Azure AI Fundamentals",
  "Microsoft Applied Skills: AI-Assisted Development with GitHub Copilot",
  "TCS NQT — 84 Percentile",
  "HIGH FLYER Recognition",
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-14">
      <h2 className="section-title mb-8 text-white">
        Certifications & <span className="neon-text">Achievements</span>
      </h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.07 }}
            className="glass-card p-5"
          >
            <p className="mb-1 text-2xl font-extrabold text-white">{item.value}</p>
            <p className="text-sm text-slate-400">{item.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {badges.map((badge, idx) => (
          <motion.div
            key={badge}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="glass-card px-4 py-3 text-sm text-slate-300"
          >
            {badge}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;
