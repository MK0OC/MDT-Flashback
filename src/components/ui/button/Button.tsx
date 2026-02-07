'use client';

import "@/src/components/ui/button/Button.scss";

const Button = ({ disabled, onClick, variant, children }: { 
    disabled?: boolean;
    onClick?: () => void; 
    variant?: "default" | "citizen" | "delete" ;
    children: React.ReactNode; 
  }) => {
  return (
    <button
        disabled={disabled}
        className={`btn ${variant}`}
        onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;