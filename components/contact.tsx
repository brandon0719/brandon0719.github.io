"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { FiMail, FiLinkedin } from "react-icons/fi";

export default function Contact() {
    const { ref } = useSectionInView("Contact");

    return (
        <motion.section
            id="contact"
            ref={ref}
            className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}>
            <SectionHeading>Contact me</SectionHeading>

            <motion.div
                className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}>
                <p className="flex items-center justify-center text-gray-700 dark:text-white mb-4">
                    <FiMail className="mr-2 w-6 h-6 text-blue-500 dark:text-blue-400" />
                    <a
                        href="mailto:brandon0719@gmail.com"
                        className="underline hover:text-blue-600 dark:hover:text-blue-300">
                        brandon0719@gmail.com
                    </a>
                </p>

                <p className="flex items-center justify-center text-gray-700 dark:text-white">
                    <FiLinkedin className="mr-2 w-6 h-6 text-blue-700 dark:text-blue-500" />
                    <a
                        href="https://www.linkedin.com/in/brandon0719/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-600 dark:hover:text-blue-300">
                        https://www.linkedin.com/in/brandon0719/
                    </a>
                </p>
            </motion.div>
        </motion.section>
    );
}
