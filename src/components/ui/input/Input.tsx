'use client';

import "./Input.scss";

const Input = ({ title, label, type, value, onChange, error, errorMessage }: { title?: string; label: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: boolean; errorMessage?: string }) => {
  return (
    <div className="input-container">
        {title ? (
          <label htmlFor="input">{title}</label>
        ): null}
          <input
            id="input"
            name="input"
            className={`input-field${error ? " input-error" : ""}`}
            placeholder={label}
            type={type}
            value={value}
            onChange={onChange}
          />
        {error && errorMessage && <span className="input-error-message">{errorMessage}</span>}
    </div>
  );
};

export default Input;