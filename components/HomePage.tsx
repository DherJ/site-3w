"use client";

import ManufactureAndQualitySection from "./ManufactureAndQualitySection";
import ProofSection from "./ProofSection";
import ServicesSection from "./ServicesSection";
import TeamSection from "./TeamSection";
import PartnersSection from "./PartnersSection";
import MainProductsSection from "./MainProductsSection";
import HeroSection from "./HeroSection";
import CtaSection from "./CtaSection";

export default function HomePage() {

    // Si tu veux utiliser une ancre "Découvrir" qui scroll vers les services :
    // <Link href="#discover" ... />

    return (
        <div>
            {/* 1) HERO FULLSCREEN */}
            <HeroSection />

            {/* 2) PROOFS */}
            <ProofSection />

            {/* 3) SERVICES */}
            <ServicesSection />

            {/* 4) FABRICATION & QUALITÉ */}
            <ManufactureAndQualitySection />

            {/* 5) PRODUITS PHARES */}
            <MainProductsSection />

            {/* 6) ÉQUIPE */}
            <TeamSection />

            {/* 7) PARTENAIRES */}
            <PartnersSection />

            {/* 8) CTA FINAL */}
            <CtaSection />
        </div>
    );
}
