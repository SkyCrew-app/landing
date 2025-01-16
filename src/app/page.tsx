import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import FleetManagement from '@/components/FleetManagement';
import ReservationManagement from '@/components/ReservationManagement';
import MemberManagement from '@/components/MemberManagement';
import FlightInstruction from '@/components/FlightInstruction';
import CustomPortals from '@/components/CustomPortals';
import BillingPayments from '@/components/BillingPayments';
import SafetyMaintenance from '@/components/SafetyMaintenance';
import InteractiveDemo from '@/components/InteractiveDemo';
import Pricing from '@/components/Pricing';
import Testimonial from '@/components/Testimonial';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <WhyChooseUs />
        <FleetManagement />
        <ReservationManagement />
        <MemberManagement />
        <FlightInstruction />
        <CustomPortals />
        <BillingPayments />
        <SafetyMaintenance />
        <InteractiveDemo />
        <Pricing />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
