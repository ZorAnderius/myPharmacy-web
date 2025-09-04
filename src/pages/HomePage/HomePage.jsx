import AnimatedCapsule from "../../shared/UI/AnimatedCapsule/AnimatedCapsule";
import Container from "../../shared/UI/Container/Container";
import HeroSection from "../../shared/UI/HeroSection/HeroSection";
import Section from "../../shared/UI/Section/Section";

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
  const handleGetStarted = () => {
    console.log("GetStarted");
  };

  const handleLearnMore = () => {
    console.log("LearnMor");
  };

  return (
    <Section style="hero" baground="gradient">
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
    </Section>
  );
};

export default HomePage;
