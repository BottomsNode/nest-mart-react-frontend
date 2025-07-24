import type { FC } from "react";
import { motion } from "framer-motion";

const AboutPage: FC = () => {
    return (
        <div className="min-h-[75vh] flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white px-4">
            <motion.div
                className="max-w-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-bold text-blue-700 mb-4">👋 About NestMart</h1>
                <p className="text-gray-700 text-lg leading-relaxed">
                    At NestMart, we're passionate developers crafting seamless shopping experiences
                    using modern technologies like <span className="font-semibold text-blue-600">React</span>,{" "}
                    <span className="font-semibold text-blue-600">TypeScript</span>, and{" "}
                    <span className="font-semibold text-blue-600">Tailwind CSS</span>. <br /><br />
                    Our mission is to blend aesthetics with functionality, creating performant and delightful web applications.
                </p>
            </motion.div>
        </div>
    );
};

export default AboutPage;