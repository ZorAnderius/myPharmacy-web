import Button from "../Button/Button";
import TypeWriterText from "../TypeWriterText/TypeWritesText";
import styles from "./HeroSection.module.css";

const HeroSection = ({
  title,
  subtitle,
  typewriterWords = [],
  primaryButtonText = "Get Started",
  secondaryButtonText = "Learn More",
  onPrimaryClick,
  onSecondaryClick,
  children,
}) => {
  const buildTitle = () => {
    if (typewriterWords.length > 0) {
      const titleParts = title.split("{{typewriter}}");
      if (titleParts.length === 2) {
        return (
          <>
            {titleParts[0]}
            <TypeWriterText
              words={typewriterWords}
              speed={100}
              deleteSpeed={50}
              delay={2000}
              thinkingPause={1500}
              style="typewriter-text"
            />
            {titleParts[1]}
          </>
        );
      }
    }
    return title;
  };

  return (
    <div className={styles["hero-content"]}>
      <div className={styles["hero-text"]}>
        <h1 className={styles["hero-title"]}>{buildTitle()}</h1>
        <p className={styles["hero-subtitle"]}>{subtitle}</p>
        <div className={styles["hero-btn-wrap"]}>
          <Button
            onClick={onPrimaryClick}
            variant="primary"
            size="large"
            className={styles["primary-btn"]}
          >
            {primaryButtonText}
          </Button>
          <Button
            onClick={onSecondaryClick}
            variant="secondary"
            size="large"
            className={styles["secondary-btn"]}
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>
      <div className={styles["hero-visual"]}>{children}</div>
    </div>
  );
};

export default HeroSection;
