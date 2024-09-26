import React from "react";
import styles from "@/styles/modules/Button.module.css";

type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
