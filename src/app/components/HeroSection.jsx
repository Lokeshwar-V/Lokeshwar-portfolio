"use client";
import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles, Stars, Text } from "@react-three/drei";

const pipelineStages = [
  { label: "Extract", sub: "from GCP", position: [-3.15, 1.1, 0], color: "#2563eb" },
  { label: "Store", sub: "in Azure", position: [-1.95, 1.1, 0], color: "#0f766e" },
  { label: "Transform", position: [-0.72, 1.1, 0], color: "#1d4ed8" },
  { label: "Embed", position: [0.48, 1.1, 0], color: "#0d9488" },
  { label: "Ingest", position: [1.68, 1.1, 0], color: "#0369a1" },
  { label: "Prompt", position: [1.68, -0.1, 0], color: "#0f766e" },
  { label: "Tool Calling", sub: "invoke tools", position: [0.82, -0.9, 0], color: "#0ea5a4" },
  { label: "Retrieval", position: [-0.28, -0.9, 0], color: "#0e7490" },
];

const pathPoints = [
  pipelineStages[0].position,
  pipelineStages[1].position,
  pipelineStages[2].position,
  pipelineStages[3].position,
  pipelineStages[4].position,
  [pipelineStages[4].position[0], 0.55, 0],
  pipelineStages[5].position,
  [pipelineStages[5].position[0], pipelineStages[6].position[1], 0],
  pipelineStages[6].position,
  pipelineStages[7].position,
];

const buildSegments = (points) => {
  const segments = [];
  let total = 0;

  for (let i = 0; i < points.length - 1; i += 1) {
    const [x1, y1, z1] = points[i];
    const [x2, y2, z2] = points[i + 1];
    const length = Math.hypot(x2 - x1, y2 - y1, z2 - z1);
    segments.push({
      start: points[i],
      end: points[i + 1],
      length,
      startAt: total,
      endAt: total + length,
    });
    total += length;
  }

  return { segments, total };
};

const pathGeometry = buildSegments(pathPoints);

const pointAtProgress = (progress) => {
  const distance = ((progress % 1) + 1) % 1 * pathGeometry.total;
  const active =
    pathGeometry.segments.find((segment) => distance >= segment.startAt && distance <= segment.endAt) ||
    pathGeometry.segments[pathGeometry.segments.length - 1];

  const local = (distance - active.startAt) / active.length;
  const [x1, y1, z1] = active.start;
  const [x2, y2, z2] = active.end;

  return [x1 + (x2 - x1) * local, y1 + (y2 - y1) * local, z1 + (z2 - z1) * local];
};

const PipelineScene = () => {
  const rigRef = useRef(null);
  const packetA = useRef(null);
  const packetB = useRef(null);
  const packetC = useRef(null);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    const p1 = pointAtProgress(t * 0.12);
    const p2 = pointAtProgress(t * 0.12 - 0.33);
    const p3 = pointAtProgress(t * 0.12 - 0.66);

    if (rigRef.current) {
      const targetX = mouse.y * 0.18;
      const targetY = mouse.x * 0.35;
      rigRef.current.rotation.x += (targetX - rigRef.current.rotation.x) * 0.08;
      rigRef.current.rotation.y += (targetY - rigRef.current.rotation.y) * 0.08;
    }

    if (packetA.current) packetA.current.position.set(p1[0], p1[1], 0.1);
    if (packetB.current) packetB.current.position.set(p2[0], p2[1], 0.1);
    if (packetC.current) packetC.current.position.set(p3[0], p3[1], 0.1);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.3}>
      <group ref={rigRef}>
        <Line
          points={pathPoints}
          color="#0ea5e9"
          lineWidth={1.8}
          transparent
          opacity={0.78}
        />

        {pipelineStages.map((stage) => (
          <group key={stage.label} position={stage.position}>
            <mesh>
              <boxGeometry args={[0.52, 0.28, 0.26]} />
              <meshStandardMaterial color={stage.color} metalness={0.55} roughness={0.35} />
            </mesh>
            <Text position={[0, 0.36, 0]} fontSize={0.145} color="#e2e8f0" anchorX="center" anchorY="middle">
              {stage.label}
            </Text>
            {stage.sub ? (
              <Text position={[0, 0.18, 0]} fontSize={0.1} color="#94a3b8" anchorX="center" anchorY="middle">
                {stage.sub}
              </Text>
            ) : null}
          </group>
        ))}

        <mesh ref={packetA} position={[-3.15, 1.1, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.45} />
        </mesh>
        <mesh ref={packetB} position={[-2.55, 1.1, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.45} />
        </mesh>
        <mesh ref={packetC} position={[-1.95, 1.1, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.45} />
        </mesh>
      </group>
    </Float>
  );
};

const HeroCanvas = () => {
  const dpr = useMemo(() => [1, 1.5], []);

  return (
    <Canvas dpr={dpr} camera={{ position: [0, 0, 7], fov: 48 }}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 4, 4]} intensity={1.25} color="#1e40af" />
      <directionalLight position={[-4, -2, 2]} intensity={0.9} color="#0f766e" />
      <Stars radius={55} depth={40} count={700} factor={1.6} fade speed={0.25} />
      <Sparkles count={30} scale={6.2} size={1.3} speed={0.08} color="#67e8f9" />
      <PipelineScene />
    </Canvas>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-[72vh] py-8 md:py-10" id="home">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="col-span-12 lg:col-span-7"
        >
          <p className="mb-3 inline-flex rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Data Engineer • Chennai, India
          </p>
          <h1 className="mb-4 text-5xl font-black leading-tight md:text-7xl">
            Hey, I&apos;m <span className="neon-text">Lokeshwar V</span>
          </h1>
          <h2 className="mb-6 text-xl font-semibold text-slate-300 md:text-2xl">
            Building ETL pipelines, AI retrieval agents, and Azure automation workflows.
          </h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            2+ years at Accenture delivering enterprise data systems processing 500K+ records with
            validated data quality. Specialized in Python, SQL, Milvus vector search, semantic
            retrieval, and workflow automation across Azure App Service, Functions, and Logic Apps.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="rounded-full bg-gradient-to-r from-sky-900 to-emerald-900 px-7 py-3 text-sm font-semibold text-slate-100 shadow-glow transition hover:scale-[1.02]"
            >
              Hire Me
            </Link>
            <Link
              href="/cv/Lokeshwar_Updated_Resume.pdf"
              className="rounded-full border border-slate-500/40 bg-slate-800/40 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:border-secondary-400/60 hover:bg-slate-800"
            >
              Download CV
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              "500K+ records processed",
              "30% retrieval relevance gain",
              "20 hrs/week automation saved",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-700/50 bg-slate-900/45 px-4 py-3 text-xs font-medium tracking-wide text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="col-span-12 h-[390px] rounded-3xl border border-slate-600/30 bg-slate-950/55 shadow-glow lg:col-span-5"
        >
          <HeroCanvas />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
