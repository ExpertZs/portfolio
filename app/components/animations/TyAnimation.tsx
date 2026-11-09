"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const TyAnimation = () => {
  const reduce = useReducedMotion();
  if (reduce) return <span>Md. Zahidul Islam</span>;
  return (
    <TypeAnimation
      sequence={[
        "Md. Zahidul Islam",
        1500,
        "Web Developer",
        1000,
        "Software Engineer",
        1000,
        "Full Stack Developer",
        1000,

      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />
  );
}

export default TyAnimation;
