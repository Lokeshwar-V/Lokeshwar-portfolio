"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { content } from "../../../tailwind.config";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>React.js</li>
        <li>Node.js</li>
        <li>Html-css-JavaScript</li>
        <li>Flutter</li>
        <li>Java</li>
        <li>Python</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>
          2022|B.Tech Information Technology - Vel Tech Multi Tech Dr
          Rangarajan Dr Shakunthala College <p>Graduated with 81.5%</p>{" "}
        </li>
        <li>
          2018|12th/HSC-Sri R M Jain Vidhyapeeth Higher Secondary School{" "}
          <p>Graduated with 82.5%</p>{" "}
        </li>
        <li>
          2016|10th/SSLC-Sri R M Jain Vidhyasharam CBSE
          <p>Graduated with 80%</p>
        </li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>Full Stack with Java training - Beasant Technologies</li>
        <li>
          The Complete 2021 Flutter Development Bootcamp with Dart - Udemy
        </li>
        <li>The Complete 2021 Web Development Bootcamp - Udemy</li>
      </ul>
    ),
  },
  {
    title: "Work Experience",
    id: "work",
    content: (
      <ul className="list-disc pl-2">
        <li>2023Dec-Present|Software Developer Intern - NYL Technologies</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about-image.png"
          alt="Hero image"
          width={500}
          height={500}
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with JavaScript, React, Node.js, Express , HTML and CSS. I'm
            currently working at Accenture as a packaged application development
            Associate. I have also published 3 flutter apps on Amazon app store
            I am a quick learner and I am always looking to expand my knowledge
            and skill set. I am a team player and I am excited to work with
            others to create amazing applications.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("work")}
              active={tab === "work"}
            >
              {" "}
              Work Experience{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
