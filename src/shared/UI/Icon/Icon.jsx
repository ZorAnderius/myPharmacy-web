import clsx from "clsx";
import icons from "../../../assets/sprite.svg";
import styles from "./Icon.module.css";

const Icon = ({ name, size = 20, type = "", styleWidth = "", width = "" }) => {
  return (
    <svg
      className={clsx(styles[name], type && styles[type])}
      width={width ? width : size}
      height={size}
      style={styleWidth ? { width: styleWidth } : {}}
    >
      <use href={`${icons}#icon-${name}`} />
    </svg>
  );
};

export default Icon;
