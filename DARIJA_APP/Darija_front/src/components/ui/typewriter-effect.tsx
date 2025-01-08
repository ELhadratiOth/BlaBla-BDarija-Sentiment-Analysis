'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../lib/utils';

interface BlurIntProps {
  word: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}

const BlurIn = ({ word, className, variant, duration = 1 }: BlurIntProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const defaultVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <div className="inline-block ">
      <motion.h1
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration }}
        variants={combinedVariants}
        className={cn(
          'font-display text-center text-4xl font-bold drop-shadow-sm md:text-3xl ',
          className,
        )}
      >
        {word}
      </motion.h1>
      <hr className="border-t-2 border-primary-dark mt-2" />
    </div>
  );
};

export default BlurIn;
