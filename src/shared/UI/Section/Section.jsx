import clsx from "clsx";
import styles from "./Section.module.css";

const Section = ({ children, style = "", baground = "" }) => {
    console.log(baground);
  return (
    <section className={clsx(styles[style], baground && styles[baground])}>
      {children}
    </section>
  );
};

export default Section;
