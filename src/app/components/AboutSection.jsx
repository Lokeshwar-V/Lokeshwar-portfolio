"use client";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Text } from "@react-three/drei";
import { motion } from "framer-motion";

const skills = [
  "Python",
  "SQL",
  "Pandas",
  "ETL",
  "Milvus",
  "PostgreSQL",
  "LangChain",
  "RAG",
  "FastAPI",
  "Flask",
  "Azure",
  "Logic Apps",
  "Azure Functions",
  "REST APIs",
  "Git",
];

const SkillOrb = () => {
  const groupRef = useRef(null);
  const points = useMemo(
    () =>
      skills.map((skill, i) => {
        const phi = Math.acos(-1 + (2 * i) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        const radius = 2.1;
        return {
          label: skill,
          position: [
            radius * Math.cos(theta) * Math.sin(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(phi),
          ],
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <group ref={groupRef}>
      {points.map((point) => (
        <Text
          key={point.label}
          position={point.position}
          fontSize={0.21}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
        >
          {point.label}
        </Text>
      ))}
      <Sparkles count={110} scale={6} size={2} speed={0.35} color="#06b6d4" />
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
            <ambientLight intensity={0.6} />
            <pointLight position={[3, 2, 3]} intensity={1.1} color="#9f67ff" />
            <pointLight position={[-2, -2, 2]} intensity={1.1} color="#06b6d4" />
            <Float speed={1.3} rotationIntensity={0.6}>
              <SkillOrb />
            </Float>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
