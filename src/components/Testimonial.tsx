'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: "Jean Dupont",
    role: "Président d'Aéroclub",
    content: "SkyCrew a révolutionné la gestion de notre aéroclub. Tout est devenu plus simple et plus efficace."
  },
  {
    name: "Marie Martin",
    role: "Pilote Instructeur",
    content: "Le suivi des heures de vol est maintenant un jeu d'enfant. Je recommande vivement SkyCrew à tous les aéroclubs."
  },
  {
    name: "Pierre Lefebvre",
    role: "Trésorier d'Aéroclub",
    content: "La gestion financière de notre club n'a jamais été aussi transparente et facile. Merci SkyCrew !"
  }
];

export default function Testimonial() {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-12 text-accent-foreground"
        >
          Ce que disent nos clients
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                  <div>
                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
