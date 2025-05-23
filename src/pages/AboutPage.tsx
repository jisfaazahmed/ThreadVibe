
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AboutHero from "@/components/about/AboutHero";
import Mission from "@/components/about/Mission";
import Values from "@/components/about/Values";
import Team from "@/components/about/Team";

const AboutPage = () => {
  return (
    <MainLayout>
      <AboutHero />
      <Mission />
      <Values />
      <Team />
    </MainLayout>
  );
};

export default AboutPage;
