"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
    const { ref } = useSectionInView("About");

    return (
        <motion.section
            ref={ref}
            className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.175 }}
            id="about">
            <SectionHeading>About me</SectionHeading>
            <p className="mb-3">
                I'm currently pursuing a degree in{" "}
                <span className="font-medium">Computer Science</span>, because
                of my passion for programming. Through school and personal
                projects I have developed skills in{" "}
                <span className="font-medium">full-stack web development</span>.{" "}
                <span className="italic">My favorite part of programming</span>{" "}
                is the problem-solving. I{" "}
                <span className="underline">love</span> the feeling of solving a
                problem, and being able to visualize the results in different
                tangible ways. I have a lot of hands on experience with{" "}
                <span className="font-medium">
                    React, Node.js, PostgreSQL, and MongoDB
                </span>
                , but I love learning new technologies. I am currently looking
                for a <span className="font-medium">full-time position</span> as
                a software developer.
            </p>

            <p>
                <span className="italic">When I'm not coding</span>, I enjoy
                going to the gym, watching movies, and playing with my dog. I
                also enjoy{" "}
                <span className="font-medium">learning new things</span>. I am
                currently learning{" "}
                <span className="font-medium">Cantonese</span>. I'm also
                learning how to play the guitar.
            </p>
        </motion.section>
    );
}
