'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Plane, Users, CreditCard, Mail, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  clubName: z.string().min(2, { message: "Le nom de l'aéroclub doit contenir au moins 2 caractères" }),
  icaoCode: z.string().length(4, { message: "Le code ICAO doit contenir exactement 4 caractères" }),
  runwayLength: z.number().min(100, { message: "La longueur de piste doit être d'au moins 100 mètres" }),
  address: z.string().min(10, { message: "L'adresse doit contenir au moins 10 caractères" }),
  contactPerson: z.string().min(2, { message: "Le nom de la personne de contact doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, { message: "Veuillez entrer un numéro de téléphone valide" }),
  numberOfPlanes: z.number().min(1).max(50),
  numberOfUsers: z.number().min(10).max(500),
  services: z.array(z.string()).default([]),
  additionalInfo: z.string(),
  subscriptionType: z.enum(["Standard", "Instruction", "PremiumIA"]).default("Standard"),
  billingCycle: z.enum(["monthly", "yearly"]).default("monthly"),
  cardholderName: z.string().min(2, { message: "Le nom du titulaire de la carte doit contenir au moins 2 caractères" }),
  cardNumber: z.string().regex(/^[0-9]{16}$/, { message: "Le numéro de carte doit contenir 16 chiffres" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, { message: "La date d'expiration doit être au format MM/YY" }),
  cvv: z.string().regex(/^[0-9]{3,4}$/, { message: "Le CVV doit contenir 3 ou 4 chiffres" }),
});

export default function Commencer() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clubName: '',
      icaoCode: '',
      runwayLength: 0,
      address: '',
      contactPerson: '',
      email: '',
      phone: '',
      numberOfPlanes: 5,
      numberOfUsers: 50,
      services: [],
      additionalInfo: '',
      subscriptionType: 'Standard',
      billingCycle: 'monthly',
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    }
  });

  const subscriptionPrices = {
    Standard: { basePrice: 50, planePrice: 10, userPrice: 2 },
    Instruction: { basePrice: 100, planePrice: 15, userPrice: 3 },
    PremiumIA: { basePrice: 200, planePrice: 20, userPrice: 4 }
  };

  const calculatePrice = () => {
    const subscriptionType = watch('subscriptionType') as keyof typeof subscriptionPrices;
    const numberOfPlanes = watch('numberOfPlanes');
    const numberOfUsers = watch('numberOfUsers');
    const billingCycle = watch('billingCycle');

    const { basePrice, planePrice, userPrice } = subscriptionPrices[subscriptionType];
    let totalPrice = basePrice + (numberOfPlanes * planePrice) + (numberOfUsers * userPrice);
    
    if (billingCycle === 'yearly') {
      totalPrice *= 10; // 2 mois gratuits pour l'abonnement annuel
    }

    return totalPrice.toFixed(2);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Inscription finalisée !", data);
    // Ici, vous pourriez ajouter une redirection vers une page de confirmation
    // ou afficher un message de succès
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white dark:from-sky-900 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center gradient-text"
        >
          Configurez votre Aéroclub
        </motion.h1>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Étape {step} sur 4</CardTitle>
            <div className="mt-2">
              <Progress value={step * 25} />
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="clubName">Nom de l&apos;aéroclub</Label>
                      <Input id="clubName" {...register('clubName')} className="mt-1" />
                      {errors.clubName && <p className="text-red-500 text-sm mt-1">{errors.clubName.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="icaoCode">Code ICAO</Label>
                      <Input id="icaoCode" {...register('icaoCode')} className="mt-1" />
                      {errors.icaoCode && <p className="text-red-500 text-sm mt-1">{errors.icaoCode.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="runwayLength">Longueur de piste (en mètres)</Label>
                      <Input id="runwayLength" type="number" {...register('runwayLength', { valueAsNumber: true })} className="mt-1" />
                      {errors.runwayLength && <p className="text-red-500 text-sm mt-1">{errors.runwayLength.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Textarea id="address" {...register('address')} className="mt-1" />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="contactPerson">Personne de contact</Label>
                      <Input id="contactPerson" {...register('contactPerson')} className="mt-1" />
                      {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input id="email" type="email" {...register('email')} className="pl-10" />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input id="phone" type="tel" {...register('phone')} className="pl-10" />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="numberOfPlanes">Nombre d&apos;avions</Label>
                      <div className="flex items-center space-x-2">
                        <Plane className="text-primary" />
                        <Slider
                          id="numberOfPlanes"
                          min={1}
                          max={50}
                          step={1}
                          value={[watch('numberOfPlanes')]}
                          onValueChange={(value: number[]) => setValue('numberOfPlanes', value[0])}
                          className="flex-grow"
                        />
                        <span className="w-10 text-center">{watch('numberOfPlanes')}</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="numberOfUsers">Nombre d&apos;utilisateurs</Label>
                      <div className="flex items-center space-x-2">
                        <Users className="text-primary" />
                        <Slider
                          id="numberOfUsers"
                          min={10}
                          max={500}
                          step={10}
                          value={[watch('numberOfUsers')]}
                          onValueChange={(value: number[]) => setValue('numberOfUsers', value[0])}
                          className="flex-grow"
                        />
                        <span className="w-10 text-center">{watch('numberOfUsers')}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label>Services proposés</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {['Formation au pilotage', 'Location d\'avions', 'Vols de découverte', 'Maintenance', 'Événements'].map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={service}
                              onCheckedChange={(checked: boolean) => {
                                const currentServices = watch('services');
                                if (checked) {
                                  setValue('services', [...currentServices, service as string]);
                                } else {
                                  setValue('services', currentServices.filter((s: string) => s !== service));
                                }
                              }}
                            />
                            <label htmlFor={service}>{service}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="additionalInfo">Informations supplémentaires</Label>
                      <Textarea id="additionalInfo" {...register('additionalInfo')} className="mt-1" />
                    </div>
                    <div>
                      <Label>Type d&apos;abonnement</Label>
                      <RadioGroup defaultValue="Standard" onValueChange={(value) => setValue('subscriptionType', value as "Standard" | "Instruction" | "PremiumIA")} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Standard" id="Standard" />
                          <Label htmlFor="Standard">Standard</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Instruction" id="Instruction" />
                          <Label htmlFor="Instruction">Instruction</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="PremiumIA" id="PremiumIA" />
                          <Label htmlFor="PremiumIA">Premium IA</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="billingCycle"
                        onCheckedChange={(checked: boolean) => setValue('billingCycle', checked ? 'yearly' : 'monthly')}
                      />
                      <Label htmlFor="billingCycle">Facturation annuelle (2 mois gratuits)</Label>
                    </div>
                    <div className="text-xl font-bold">
                      Prix: {calculatePrice()}€ 
                      {watch('billingCycle') === 'monthly' ? '/mois' : '/an'}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="cardholderName">Nom du titulaire de la carte</Label>
                      <Input id="cardholderName" {...register('cardholderName')} className="mt-1" />
                      {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <div className="relative mt-1">
                        <CreditCard className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input id="cardNumber" {...register('cardNumber')} className="pl-10" placeholder="1234 5678 9012 3456" />
                      </div>
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <Label htmlFor="expiryDate">Date d&apos;expiration</Label>
                        <Input id="expiryDate" {...register('expiryDate')} placeholder="MM/YY" className="mt-1" />
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>}
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" {...register('cvv')} placeholder="123" className="mt-1" />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <h3 className="font-semibold mb-2">Récapitulatif de la commande</h3>
                      <p>Type d&apos;abonnement: {watch('subscriptionType')}</p>
                      <p>Cycle de facturation: {watch('billingCycle') === 'monthly' ? 'Mensuel' : 'Annuel'}</p>
                      <p>Nombre d&apos;avions: {watch('numberOfPlanes')}</p>
                      <p>Nombre d&apos;utilisateurs: {watch('numberOfUsers')}</p>
                      <p className="font-bold mt-2">Total: {calculatePrice()}€ {watch('billingCycle') === 'monthly' ? '/mois' : '/an'}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <Button type="button" onClick={prevStep}>Précédent</Button>
                )}
                {step < 4 ? (
                  <Button type="button" onClick={nextStep}>Suivant</Button>
                ) : (
                  <Button type="submit">Finaliser l&apos;inscription</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
