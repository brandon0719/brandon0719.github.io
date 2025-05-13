import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";
import project1 from "@/public/project-1.png";
import project2 from "@/public/project-2.png";
import project3 from "@/public/project-3.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
    {
        title: "Student",
        location: "Stony Brook, NY",
        description:
            "Currently pursuing a Bachelor's degree in Computer Science at Stony Brook University.",
        icon: React.createElement(LuGraduationCap),
        date: "Aug 2022 - Present",
    },
    {
        title: "Undergraduate Research Assistant",
        location: "Stony Brook, NY",
        description:
            "I worked as a research assistant in the Health Science department. I was involved in a project that focused on developing a web application for data visualization.",
        icon: React.createElement(CgWorkAlt),
        date: "Aug 2024 - Jan 2025",
    },
    {
        title: "Mentee",
        location: "Basta x Google SWEP",
        description:
            "Engaged in 10 weeks of pair programming and mentorship with a Google Software Engineer.",
        icon: React.createElement(BsPerson),
        date: "Feb 2025 - May 2025",
    },
    {
        title: "Software Development Engineer (SDE) Intern",
        location: "Seattle, WA",
        description: "Working as an SDE Intern at Amazon Web Services",
        icon: React.createElement(CgWorkAlt),
        date: "May 2025 - Present",
    },
] as const;

export const projectsData = [
    {
        title: "Smart Parking System",
        description:
            "Designed and developed smart parking system used to reserve spots, view availability, manage lots, and more.",
        tags: ["React", "Node.js", "PostgreSQL", "MapBox API", "Stripe", "JWT"],
        imageUrl: project1,
        githubUrl: "https://github.com/brandon0719/CSE416-SBU12-P4SBU",
    },
    {
        title: "Phreddit",
        description:
            "Web app simialr to reddit. Featuring post creation, commenting, a voting system, community creation, admin functionality and more.",
        tags: ["React", "Node.js", "MongoDB", "JWT"],
        imageUrl: project2,
        githubUrl: "https://github.com/brandon0719/reddit-clone",
    },
    {
        title: "Stock Tracker",
        description:
            "Web app designed and engineered for personal use. Used to log trades, visualize live stock prices, trade statistics, and stock recommendations.",
        tags: ["React", "Node.js", "MongoDB", "APIs"],
        imageUrl: project3,
        githubUrl: "https://github.com/brandon0719/stock-tracker",
    },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Git",
  "AWS",
  "MongoDB",
  "Express",
  "PostgreSQL",
  "Python",
  "C",
  "Java",
] as const;
