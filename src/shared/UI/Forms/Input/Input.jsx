import styles from "./Input.module.css";
import clsx from "clsx";
import React from "react";

const buildStyle = (value = false, error = false) => {
  if (error) return styles.error;
  if (value) return styles.active;
  return "";
};

const Input = React.memo(({ field, id, label, meta, ...props }) => {
  return (
    <div className={styles.formGroup}>
      <input
        className={clsx(styles.formField, buildStyle(field.value, meta.error))}
        id={id}
        {...field}
        {...props}
        autoComplete="off"
      />
      <label className={styles.formLabel} htmlFor={id}>
        {label}
      </label>
      {meta.touched && meta.error && (
        <span className={styles.errorMsg}>{meta.error}</span>
      )}
    </div>
  );
});

export default Input;
