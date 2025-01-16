'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function DemoSection() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section id="demo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-6 text-foreground"
            >
              Découvrez SkyCrew en action
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl mb-6 text-muted-foreground"
            >
              Voyez comment SkyCrew peut transformer la gestion de votre aéroclub avec notre démo interactive.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg">Voir la démo</Button>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <motion.div
              style={{ scale }}
              className="rounded-lg overflow-hidden shadow-2xl"
            >
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="SkyCrew Demo"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
