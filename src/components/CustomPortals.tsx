'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Building, LayoutDashboard } from 'lucide-react';

const portals = [
  { title: "Portail Membres", description: "Accès personnalisé aux réservations, vols et formations", icon: Users },
  { title: "Portail Instructeurs", description: "Gestion des cours, évaluations et planning", icon: UserCheck },
  { title: "Portail Administration", description: "Supervision globale et gestion de l'aéroclub", icon: Building },
  { title: "Tableaux de Bord Personnalisés", description: "Informations pertinentes pour chaque rôle", icon: LayoutDashboard },
];

export default function CustomPortals() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-foreground"
        >
          Portails Personnalisés
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portals.map((portal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <portal.icon className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle className="text-xl font-semibold">{portal.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{portal.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
