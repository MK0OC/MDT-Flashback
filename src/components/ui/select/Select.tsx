'use client';

import { useState, useRef, useEffect } from "react";
import "./Select.scss";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string[];
  placeholder?: string;
  onChange: (values: string[]) => void;
}

const Select = ({ options, value, placeholder = "Sélectionner...", onChange }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const displayLabel = value.length > 0
    ? options.filter((o) => value.includes(o.value)).map((o) => o.label).join(", ")
    : placeholder;

  return (
    <div className="select-container" ref={ref}>
      <button
        className="select-trigger"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <span className="select-label">{displayLabel}</span>
        <svg
          className={`select-arrow ${open ? "open" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="select-dropdown">
          {options.map((option) => (
            <li
              key={option.value}
              className={`select-option ${value.includes(option.value) ? "active" : ""}`}
              onClick={() => toggleOption(option.value)}
            >
              <span className={`select-checkbox ${value.includes(option.value) ? "checked" : ""}`} />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
