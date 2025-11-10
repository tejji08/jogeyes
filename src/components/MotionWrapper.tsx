"use client"

import { motion } from "framer-motion";
import * as React from "react";

export function MotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default MotionWrapper;
