"use client";
import React, { useEffect, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import Image from "next/image";
import { FlipWords } from "./flip-words";

export const HeroParallax = ({
    products,
}: {
    products: {
        title: string;
        thumbnail: string;
    }[];
}) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const [innerWidth, setInnerWidth] = useState(0);
    useEffect(() => {
        setInnerWidth(window.innerWidth);
      }, []);

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = innerWidth > 700 ?
        useSpring(
            useTransform(scrollYProgress, [0, 1], [0, 1000]),
            springConfig
        ) :
        useSpring(
            useTransform(scrollYProgress, [0, 1], [0, 500]),
            springConfig
        );
    const translateXReverse = innerWidth > 700 ?
        useSpring(
            useTransform(scrollYProgress, [0, 1], [0, -1000]),
            springConfig
        ) :
        useSpring(
            useTransform(scrollYProgress, [0, 1], [0, -500]),
            springConfig
        );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig
    );
    const translateY = innerWidth > 700 ?
        useSpring(
            useTransform(scrollYProgress, [0, 0.2], [-700, 300]),
            springConfig
        ) :
        useSpring(
            useTransform(scrollYProgress, [0, 0.2], [-500, 50]),
            springConfig
        );
    return (
        <div
            ref={ref}
            className="h-[150vh] lg:h-[310vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=""
            >
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                    {firstRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row  mb-20 space-x-20 ">
                    {secondRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                    {thirdRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = () => {
    const words = ["Full-Stack-Developer","Software-Engineer","UI/UX-Designer","Problem-Solver"];
    return (
        <div className="max-w-7xl relative mx-auto py-20 md:py-10 px-4 w-full left-0 top-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-8xl font-bold dark:text-white text-center z-10">
                Shubham Tulsyan
            </h1>
            <h2 className="text-2xl md:text-5xl font-bold z-10">
                <FlipWords words={words} /> <br />
            </h2>
            <p className="max-w-2xl text-base md:text-xl mt-2 md:mt-8 dark:text-neutral-200 text-center z-10">
                Based in Bengaluru with a strong foundation in technical skills and a passion for problem-solving.
            </p>
            <h2 className="text-xl md:text-3xl text-teal-600 font-semibold tracking-wide uppercase text-center mt-10 z-10">
                Here's what I have learned and built so far.
            </h2>
            <p>

            </p>
        </div>
    );
};

export const ProductCard = ({
    product,
    translate,
}: {
    product: {
        title: string;
        thumbnail: string;
    };
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.title}
            className="group/product h-32 w-[10rem] lg:h-96 lg:w-[29rem] relative flex-shrink-0"
        >
            <Image
                src={product.thumbnail}
                height="600"
                width="600"
                className="object-contain object-left-top absolute h-full w-full inset-0"
                alt={product.title}
            />
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-xl sm:text-4xl text-white">
                {product.title}
            </h2>
        </motion.div>
    );
};
