
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 },
    transitionEnd: { transform: "none" }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const overlayVariants = {
  initial: { y: "0%" }, // Starts fully covering
  animate: { 
    y: "-100%", 
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } 
  },
  exit: { 
    y: "0%", 
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } 
  }
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        <motion.div
          className="fixed inset-0 z-[100] bg-accent pointer-events-none"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={overlayVariants}
        />
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={contentVariants}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
