"use client";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles, Text } from "@react-three/drei";
import { motion } from "framer-motion";

const skills = [
  { label: "ETL", position: [-2.2, 1.25, 0], color: "#22d3ee" },
  { label: "Python", position: [-1.35, 0.3, 0], color: "#60a5fa" },
  { label: "SQL", position: [-2.1, -1.0, 0], color: "#60a5fa" },
  { label: "Milvus", position: [0, 1.65, 0], color: "#a5b4fc" },
  { label: "RAG", position: [1.3, 0.35, 0], color: "#a5b4fc" },
  { label: "LangChain", position: [1.75, -0.65, 0], color: "#818cf8" },
  { label: "Azure", position: [2.25, 1.1, 0], color: "#22d3ee" },
  { label: "Functions", position: [2.15, -0.1, 0], color: "#22d3ee" },
  { label: "Logic Apps", position: [2.35, -1.2, 0], color: "#22d3ee" },
];

const SkillConstellation = () => {
  const groupRef = useRef(null);
  const links = useMemo(() => skills.map((skill) => [[0, 0, 0], skill.position]), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.18) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={0.55} />
      </mesh>

      {links.map((line, idx) => (
        <Line key={`line-${idx}`} points={line} color="#334155" transparent opacity={0.8} lineWidth={1.2} />
      ))}

      {skills.map((skill) => (
        <group key={skill.label} position={skill.position}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={0.35} />
          </mesh>
          <Text position={[0, 0.22, 0]} fontSize={0.16} color="#e2e8f0" anchorX="center" anchorY="middle">
            {skill.label}
          </Text>
        </group>
      ))}

      <Text position={[0, -0.42, 0]} fontSize={0.16} color="#94a3b8" anchorX="center" anchorY="middle">
        Data Core
      </Text>
      <Sparkles count={65} scale={6.2} size={1.8} speed={0.2} color="#22d3ee" />
    </group>
  );
};

const AboutSection = () => {
  return (
    <section className="py-14" id="about">
      <h2 className="section-title mb-6 text-white">
        About <span className="neon-text">Me</span>
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 md:p-8"
        >
          <p className="mb-4 text-sm leading-relaxed text-slate-300 md:text-base">
            I am a Data Engineer with 2+ years of experience building scalable pipelines, retrieval
            systems, and automation workflows. At Accenture, I design robust ETL jobs with data
            validation and support AI use-cases through vector search and structured query systems.
          </p>
          <p className="mb-6 text-sm leading-relaxed text-slate-400 md:text-base">
            My work focuses on reliable data ingestion, semantic retrieval quality, and cloud-native
            automation using Python, SQL, Milvus, and Microsoft Azure services.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "500K+ Records/Run",
              "30% Retrieval Boost",
              "20 Hrs/Week Saved",
              "Star of the Month 2025",
            ].map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-secondary-400/30 bg-secondary-500/10 px-3 py-1 text-xs font-semibold text-secondary-300"
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="glass-card h-[360px] p-4 md:h-[420px]">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.65} />
            <pointLight position={[3, 2, 3]} intensity={1.05} color="#818cf8" />
            <pointLight position={[-2, -2, 2]} intensity={1.05} color="#22d3ee" />
            <Float speed={1.3} rotationIntensity={0.6}>
              <SkillConstellation />
            </Float>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
