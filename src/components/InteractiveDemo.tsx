'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Calendar, Users, FileText } from 'lucide-react';

const demoScreens = [
  {
    title: "Gestion de Flotte",
    icon: Plane,
    content: "Visualisez l'état de votre flotte en temps réel, planifiez la maintenance, et suivez l'historique des vols.",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    title: "Réservations",
    icon: Calendar,
    content: "Système de réservation en ligne avec calendrier interactif et gestion automatique des conflits.",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    title: "Gestion des Membres",
    icon: Users,
    content: "Suivez les qualifications des pilotes, gérez les adhésions et les formations en cours.",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    title: "Facturation",
    icon: FileText,
    content: "Générez automatiquement les factures et gérez les paiements en ligne en toute sécurité.",
    image: "/placeholder.svg?height=300&width=400"
  }
];

export default function InteractiveDemo() {
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-secondary-foreground">
          Découvrez SkyCrew en Action
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <Card>
              <CardContent className="p-6">
                {demoScreens.map((screen, index) => (
                  <Button
                    key={index}
                    variant={activeScreen === index ? "default" : "ghost"}
                    className="w-full justify-start mb-4 text-left"
                    onClick={() => setActiveScreen(index)}
                  >
                    <screen.icon className="mr-2 h-5 w-5" />
                    {screen.title}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="lg:w-2/3">
            <Card>
              <CardContent className="p-6">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                    {demoScreens[activeScreen].title}
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    {demoScreens[activeScreen].content}
                  </p>
                  <img
                    src={demoScreens[activeScreen].image}
                    alt={demoScreens[activeScreen].title}
                    className="mx-auto rounded-lg shadow-lg"
                  />
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
