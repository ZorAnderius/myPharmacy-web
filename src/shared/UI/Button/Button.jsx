import React from "react";
import styles from "./Button.module.css";

const Button = React.memo(
  ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "medium",
    disabled = false,
    fullWidth = false,
    ...props
  }) => {
    const buttonClasses = [
      styles.button,
      styles[variant],
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
  }
);

Button.displayName = "Button";

export default Button;
