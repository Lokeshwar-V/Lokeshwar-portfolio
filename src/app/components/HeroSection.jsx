"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sparkles, Stars } from "@react-three/drei";

const Orb = () => {
  const meshRef = React.useRef(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.35;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <Float speed={1.8} rotationIntensity={1} floatIntensity={1.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 10]} />
        <MeshDistortMaterial
          color="#7c3aed"
          roughness={0.1}
          metalness={0.6}
          emissive="#06b6d4"
          emissiveIntensity={0.25}
          distort={0.35}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
};

const HeroCanvas = () => {
  const dpr = useMemo(() => [1, 1.5], []);

  return (
    <Canvas dpr={dpr} camera={{ position: [0, 0, 5], fov: 55 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 3]} intensity={2.2} color="#9f67ff" />
      <directionalLight position={[-3, -2, 1]} intensity={1.4} color="#06b6d4" />
      <Stars radius={65} depth={50} count={2000} factor={4} fade speed={1.2} />
      <Sparkles count={130} scale={8} size={3} speed={0.2} color="#9f67ff" />
      <Orb />
      <OrbitControls autoRotate autoRotateSpeed={0.7} enableZoom={false} enablePan={false} />
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
          <p className="mb-3 inline-flex rounded-full border border-secondary-400/30 bg-secondary-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-400">
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
              className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
            >
              Hire Me
            </Link>
            <Link
              href="/cv/Lokeshwar Resume Updated.pdf"
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
          className="col-span-12 h-[380px] rounded-3xl border border-slate-600/20 bg-slate-900/30 shadow-glow lg:col-span-5"
        >
          <HeroCanvas />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
