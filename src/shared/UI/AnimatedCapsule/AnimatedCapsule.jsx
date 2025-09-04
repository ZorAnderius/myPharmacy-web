import styles from "./AnimatedCapsule.module.css";

const AnimatedCapsule = ({
  count = 3,
  variant = "standard",
}) => {
  const capsuleSizes = ["small", "medium", "large", "xlarge"];
  const capsuleColors = ["default", "custom", "premium", "vitamin"];

  const capsules = Array.from({ length: count }, (_, index) => {
    // Assign different sizes and colors to each capsule
    const capsuleSize = capsuleSizes[index % capsuleSizes.length];
    const capsuleColor = capsuleColors[index % capsuleColors.length];

    return (
      <div
        key={index}
        className={`${styles['capsule']} ${styles[`capsule${index + 1}`]} ${
          styles[capsuleSize]
        } ${styles[capsuleColor]} ${styles[variant]}`}
      >
        {/* Capsule body with realistic details */}
        <div className={styles["capsule-body"]}>
          <div className={styles["capsule-half"]}></div>
          <div className={styles["capsule-half"]}></div>
        </div>
        {/* Optional: Add shine effect */}
        <div className={styles.shine}></div>
      </div>
    );
  });
  return <div className={styles['capsules-wrap']}>{capsules}</div>;
};

export default AnimatedCapsule;
