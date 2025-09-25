import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedCapsule from "../../shared/UI/AnimatedCapsule/AnimatedCapsule";
import Container from "../../shared/UI/Container/Container";
import HeroSection from "../../shared/UI/HeroSection/HeroSection";
import Section from "../../shared/UI/Section/Section";
import AboutModal from "../../shared/UI/AboutModal/AboutModal";
import { ROUTES } from "../../constants/routes";

const typewriterWords = [
  "delivered",
  "prescribed",
  "monitored",
  "tracked",
  "managed",
  "optimized",
  "personalized",
  "verified",
];

const HomePage = () => {
  const navigate = useNavigate();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handleGetStarted = () => {
    navigate(ROUTES.SHOP);
  };

  const handleLearnMore = () => {
    setIsAboutModalOpen(true);
  };

  const handleCloseAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  return (
    <Section style="hero">
      <Container>
        <HeroSection
          title="Your medication {{typewriter}}"
          subtitle="Say goodbye to all your healthcare worries with us"
          typewriterWords={typewriterWords}
          primaryButtonText="Get Started"
          secondaryButtonText="Learn More"
          onPrimaryClick={handleGetStarted}
          onSecondaryClick={handleLearnMore}
        >
          <AnimatedCapsule count={6} />
        </HeroSection>
      </Container>
      
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={handleCloseAboutModal}
      />
    </Section>
  );
};

export default HomePage;
