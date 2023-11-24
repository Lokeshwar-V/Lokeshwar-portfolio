"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Next.js Portfolio Website",
    description: "Welcome to my personal website, where you can learn more about me and my projects. I am a web developer who loves to create responsive and interactive websites using modern technologies. My website is built with Next.js, a React framework that enables fast and scalable web development. Next.js allows me to use server-side rendering, static site generation, and  create dynamic and SEO-friendly pages.One of the features that I am proud of is the animation of numbers on my homepage. I used Framer Motion, a library for React that makes it easy to animate complex UI elements. Framer Motion lets me control the timing, easing, and transitions of the animations with simple props. I also used React CountUp, a component that animates the counting of numbers from zero to any value.I hope you enjoy browsing my website and feel free to contact me if you have any questions or feedback. Thank you for visiting!",
    image: "/images/projects/1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Lokeshwar-V/Lokeshwar-portfolio.git",
    previewUrl: "https://lokeshwar-portfolio.vercel.app/",
  },
 {
    id: 2,
    title: "Climate card ",
    description: "Climate Card React Site is a website that showcases how to create a simple weather app using React and OpenWeatherMap API. To create beautiful and responsive weather cards that display the current and forecasted weather data for different cities. You can learn how to fetch the data from the API, use environment variables, and use React hooks to manage the state of the app. You can also see the source code and a live demo of the app on the website1. If you are interested in learning React and building a weather app, this website is a great resource for you.",
    image: "/images/projects/2.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Lokeshwar-V/climate-card.git",
    previewUrl: "https://climate-card-seven.vercel.app/",
  },
  

  {
    id: 3,
    title: "Journal-EJS",
    description: "Personal Journal is a website that allows you to create and manage your own online diary. Personal Journal lets you write about your thoughts, feelings, experiences, and goals in a private and secure way. Personal Journal uses EJS, a simple and powerful templating language that enables JavaScript to generate HTML, to create dynamic and interactive web pages ,Personal Journal is a personal and creative website that uses the benefits of EJS and JavaScript to deliver a user-friendly and enjoyable writing experience.",
    image: "/images/projects/3.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Lokeshwar-V/Journal-EJS.git",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Xylophone-Flutter ",
    description: "My xylophone app is built with Flutter, a cross-platform framework that allows me to create beautiful and responsive user interfaces. Flutter also provides many widgets and packages that make development easier and faster.One of the packages that I used in my app is Audio players, which enables me to play multiple audio files simultaneously. Audio players can play audio from different sources, such as remote files, local files, or local assets. In my app, I used local assets to store the sound files for each note.To create the buttons for the notes, I used FlatButton widget, which is a simple button that reacts to touches by filling with color. I also used SizedBox widget to adjust the size and spacing of the buttons. To arrange the buttons in a vertical column, I used Column widget, which is a layout widget that displays its children in a single line.",
    image: "/images/projects/4.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/Lokeshwar-V/Xylophone-Flutter.git",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "BMI-Calculator-Flutter ",
    description: "Do you want to know your body mass index (BMI) and how it affects your health? Try this app, which is a simple and easy-to-use BMI calculator built with Flutter. You can enter your height and weight in metric units and get your BMI result instantly. The app also shows you a color-coded message that indicates whether you are underweight, normal, overweight, or obese according to the BMI ranges. You can also see the formula used to calculate the BMI and learn more about its meaning and limitations. This app is a great example of how to use Flutter to create a cross-platform application with a beautiful and responsive user interface. You can download the source code from GitHub",
    image: "/images/projects/5.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/Lokeshwar-V/BMI-Calculator-Flutter.git",
    previewUrl: "https://www.amazon.com/gp/product/B092HKLC6Z",
  },
  {
    id: 6,
    title: "Clima-Flutter",
    description: "Climate is a beautiful and easy-to-use app that lets you check the current weather and forecast for any location on Earth. Built with Flutter, a powerful UI toolkit from Google, Climate delivers a smooth and native experience on any screen size and platform. Whether you need to plan your day, your week, or your next trip, Climate has you covered with reliable and accurate weather data from OpenWeatherMap, a leading provider of weather APIs.",
    image: "/images/projects/6.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/Lokeshwar-V/Clima-Flutter.git",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
