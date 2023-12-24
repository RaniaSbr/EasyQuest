import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RandomizeText from "./test";

const MultiLayerParallax = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <div
      ref={ref}
      className="w-full h-screen overflow-hidden relative grid place-items-center"
    >
      <motion.div 
       style={{ y: textY }}>
        <RandomizeText />
      </motion.div>
      <motion.div
        className="h-screen absolute inset-0 z-0"
        style={{
          backgroundImage: `url(./Assets/bgt.jpg)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />

      <div
        className="h-screen absolute inset-0 z-20"
        style={{
          backgroundImage: `url(./Assets/bgb.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

export default MultiLayerParallax;
