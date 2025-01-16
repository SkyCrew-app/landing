'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-100 via-white to-sky-50 dark:from-sky-900 dark:via-gray-900 dark:to-sky-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
          Décollage vers <br />
          <span className="gradient-text">l&apos;Efficacité</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          SkyCrew : La plateforme révolutionnaire pour la gestion d&apos;aéroclub du 21ème siècle.
        </p>
        <Button size="lg" className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl">
          Démarrez votre Voyage
        </Button>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0"
      >
        <svg viewBox="0 0 1440 320" className="w-full">
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </motion.div>
    </section>
  );
}
