// src/components/AnimatedSection.tsx
'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface AnimatedSectionProps {
  children: React.ReactNode;
}

const AnimatedSection: FC<AnimatedSectionProps> = ({ children }) => {
  const { ref, isIntersecting } = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isIntersecting ? 1 : 0, y: isIntersecting ? 0 : 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="my-16"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
