import styles from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  style = "",
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  console.log(style);
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[style],
    styles[size],
    fullWidth && styles.fullWidth,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
