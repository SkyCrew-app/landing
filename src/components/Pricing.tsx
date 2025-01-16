/* eslint-disable prefer-const */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Check, Plane, Users } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const accountTypes = [
{ 
  name: "Standard", 
  features: [
    "Gestion de flotte",
    "Réservations en ligne",
    "Suivi des heures de vol",
    "Gestion des membres",
    "Facturation automatique",
    "Support client par email"
  ],
  basePrice: 50
},
{ 
  name: "Instruction", 
  features: [
    "Toutes les fonctionnalités Standard",
    "Gestion des cours de pilotage",
    "Suivi des progrès des élèves",
    "Planification des instructeurs",
    "Support client prioritaire"
  ],
  basePrice: 100
},
{ 
  name: "Premium IA", 
  features: [
    "Toutes les fonctionnalités Instruction",
    "Analyse prédictive de la maintenance",
    "Optimisation IA des réservations",
    "Chatbot IA pour le support",
    "Support client 24/7"
  ],
  basePrice: 200
}
];

export default function Pricing() {
  const [planes, setPlanes] = useState(5);
  const [users, setUsers] = useState(50);
  const [isYearly, setIsYearly] = useState(false);
  const [selectedType, setSelectedType] = useState("Standard");

  const calculatePrice = () => {
    const selectedAccount = accountTypes.find(type => type.name === selectedType);
    let basePrice = selectedAccount ? selectedAccount.basePrice : 50;
    let planePrice = planes * 10; // 10€ par avion
    let userPrice = users * 2; // 2€ par utilisateur
    let totalPrice = basePrice + planePrice + userPrice;
    
    if (isYearly) {
      totalPrice *= 10; // 2 mois gratuits pour l'abonnement annuel
    }

    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    console.log("Prix calculé:", calculatePrice());
  }, [selectedType, planes, users, isYearly]);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-sky-50 to-white dark:from-sky-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-12 text-center gradient-text"
        >
          Tarification Personnalisée
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-2xl">Configurez votre abonnement</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Adaptez SkyCrew à vos besoins spécifiques
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label className="text-lg font-medium mb-2 block">Type de compte</Label>
                <RadioGroup 
                  defaultValue="Standard" 
                  onValueChange={setSelectedType}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {accountTypes.map((type) => (
                    <div key={type.name} className="relative">
                      <RadioGroupItem
                        value={type.name}
                        id={type.name}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={type.name}
                        className={cn(
                          "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                          selectedType === type.name ? "border-primary" : ""
                        )}
                      >
                        <span className="text-lg font-semibold">{type.name}</span>
                        <span className="text-sm text-muted-foreground mt-1">À partir de {type.basePrice}€/mois</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-4">
                <Label className="text-lg font-medium">Nombre d&apos;avions</Label>
                <div className="flex items-center space-x-4">
                  <Plane className="text-primary w-6 h-6" />
                  <Slider
                    value={[planes]}
                    onValueChange={(value) => setPlanes(value[0])}
                    max={50}
                    step={1}
                    className="flex-grow"
                  />
                  <span className="font-semibold min-w-[3ch] text-right">{planes}</span>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-lg font-medium">Nombre d&apos;utilisateurs</Label>
                <div className="flex items-center space-x-4">
                  <Users className="text-primary w-6 h-6" />
                  <Slider
                    value={[users]}
                    onValueChange={(value) => setUsers(value[0])}
                    max={500}
                    step={10}
                    className="flex-grow"
                  />
                  <span className="font-semibold min-w-[3ch] text-right">{users}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Facturation annuelle</span>
                <div className="flex items-center space-x-2">
                  <span className={cn("text-sm", !isYearly && "font-bold")}>Mensuel</span>
                  <Switch
                    checked={isYearly}
                    onCheckedChange={setIsYearly}
                  />
                  <span className={cn("text-sm", isYearly && "font-bold")}>Annuel</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="bg-gradient-to-r from-primary to-primary-foreground text-white">
              <CardTitle className="text-3xl font-bold text-center">
                Votre abonnement personnalisé
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <span className="text-5xl font-bold">{calculatePrice()}€</span>
                <span className="text-xl text-muted-foreground">/{isYearly ? 'an' : 'mois'}</span>
                {isYearly && (
                  <p className="text-sm text-muted-foreground mt-2">
                    (Économisez 20% avec la facturation annuelle)
                  </p>
                )}
              </div>
              <div className="grid gap-4 mb-6">
                <h4 className="font-semibold text-lg">Fonctionnalités incluses :</h4>
                <ul className="space-y-2">
                  {accountTypes.find(type => type.name === selectedType)?.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full" size="lg">Commencer maintenant</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
