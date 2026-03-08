"use client";
import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Sparkles, Stars, Text } from "@react-three/drei";

const PipelineScene = () => {
  const packetA = useRef(null);
  const packetB = useRef(null);
  const packetC = useRef(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const loopA = (t * 0.22) % 1;
    const loopB = (t * 0.2 + 0.33) % 1;
    const loopC = (t * 0.24 + 0.66) % 1;

    if (packetA.current) {
      packetA.current.position.x = -2.8 + loopA * 5.6;
      packetA.current.position.y = 1.15;
    }

    if (packetB.current) {
      packetB.current.position.x = -2.8 + loopB * 5.6;
      packetB.current.position.y = -1.15;
    }

    if (packetC.current) {
      packetC.current.position.x = 2.8;
      packetC.current.position.y = -1.15 + loopC * 2.3;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
      <group>
        <Line points={[[-2.8, 1.15, 0], [0, 1.15, 0], [2.8, 1.15, 0]]} color="#38bdf8" lineWidth={1.6} transparent opacity={0.8} />
        <Line points={[[-2.8, -1.15, 0], [0, -1.15, 0], [2.8, -1.15, 0]]} color="#818cf8" lineWidth={1.6} transparent opacity={0.8} />
        <Line points={[[2.8, -1.15, 0], [2.8, 1.15, 0]]} color="#22d3ee" lineWidth={1.6} transparent opacity={0.8} />

        {[-2.8, 0, 2.8].map((x, i) => (
          <group key={`stage-${x}`}>
            <mesh position={[x, 1.15, 0]}>
              <boxGeometry args={[0.65, 0.35, 0.35]} />
              <meshStandardMaterial color={i === 0 ? "#38bdf8" : i === 1 ? "#818cf8" : "#22d3ee"} metalness={0.55} roughness={0.35} />
            </mesh>
            <mesh position={[x, -1.15, 0]}>
              <boxGeometry args={[0.65, 0.35, 0.35]} />
              <meshStandardMaterial color={i === 0 ? "#38bdf8" : i === 1 ? "#818cf8" : "#22d3ee"} metalness={0.55} roughness={0.35} />
            </mesh>
          </group>
        ))}

        <Text position={[-2.8, 1.8, 0]} fontSize={0.22} color="#cbd5e1" anchorX="center" anchorY="middle">
          Ingest
        </Text>
        <Text position={[0, 1.8, 0]} fontSize={0.22} color="#cbd5e1" anchorX="center" anchorY="middle">
          Transform
        </Text>
        <Text position={[2.8, 1.8, 0]} fontSize={0.22} color="#cbd5e1" anchorX="center" anchorY="middle">
          Serve
        </Text>

        <mesh ref={packetA} position={[-2.8, 1.15, 0.08]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={0.7} />
        </mesh>
        <mesh ref={packetB} position={[-2.8, -1.15, 0.08]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#a5b4fc" emissive="#a5b4fc" emissiveIntensity={0.7} />
        </mesh>
        <mesh ref={packetC} position={[2.8, -1.15, 0.08]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.7} />
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
      <directionalLight position={[4, 4, 4]} intensity={1.8} color="#818cf8" />
      <directionalLight position={[-4, -2, 2]} intensity={1.2} color="#22d3ee" />
      <Stars radius={55} depth={40} count={900} factor={2} fade speed={0.4} />
      <Sparkles count={55} scale={7} size={2} speed={0.15} color="#22d3ee" />
      <PipelineScene />
      <OrbitControls autoRotate autoRotateSpeed={0.25} enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-[86vh] py-12" id="home">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="col-span-12 lg:col-span-7"
        >
          <p className="mb-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
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
              className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-7 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="col-span-12 h-[380px] rounded-3xl border border-slate-600/30 bg-slate-950/45 shadow-glow lg:col-span-5"
        >
          <HeroCanvas />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
