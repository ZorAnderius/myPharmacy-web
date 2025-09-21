import styles from "./AuthRightPanel.module.css";

const AuthRightPanel = () => {
  return (
      <section className={styles["auth-right-panel"]}>
      <h1 className={styles["auth-right-panel-heading"]}>
        Your medication, delivered. Say goodbye to all{" "}
        <span className={styles["auth-right-panel-highlight"]}>
          your healthcare
        </span>{" "}
        worries with us.
      </h1>
    </section>
  );
};

export default AuthRightPanel;
