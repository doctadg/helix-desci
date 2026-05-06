import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Broken } from "@/components/Broken";
import { Testimonial } from "@/components/Testimonial";
import { TrustedBy } from "@/components/TrustedBy";
import { Streamline } from "@/components/Streamline";
import { Products } from "@/components/Products";
import { MidCTA } from "@/components/MidCTA";
import { Industries } from "@/components/Industries";
import { Modules } from "@/components/Modules";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative isolate">
      <Navigation />
      <Hero />
      <Broken />
      <Testimonial />
      <TrustedBy />
      <Streamline />
      <Products />
      <MidCTA />
      <Industries />
      <Modules />
      <FinalCTA />
      <Footer />
    </main>
  );
}
