"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { PortfolioSlider } from "@/components/sections/PortfolioSlider";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Preloader } from "@/components/ui/Preloader";
import { LatestInsights } from "@/components/sections/LatestInsights";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <div className="bg-[#0a0a0a] text-white selection:bg-[var(--brand-orange)] selection:text-white overflow-x-hidden font-sans">
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isScrolled={isScrolled}
          scrollToContact={scrollToContact}
        />
        <Hero scrollToContact={scrollToContact} entranceActive={preloaderDone} />
        <PortfolioSlider />
        <Services />
        <Pricing scrollToContact={scrollToContact} />
        <Testimonials />
        <About />
        <LatestInsights />
        <Contact scrollToContact={scrollToContact} />
        <Footer />
      </div>
    </>
  );
}
