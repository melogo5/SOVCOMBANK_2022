import React, { ReactNode } from "react";
import { Input } from "antd";
import InputMask from "react-input-mask";
import { Controller } from "effector-react-form";

type InputProps = {
  controller: Controller;
  label?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  lableClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  mask?: string;
  maskPlaceholder?: string | null,
  prefix?: ReactNode;
};

export const InputField: React.FC<InputProps> = ({
  controller,
  label,
  className = "",
  lableClassName = "",
  inputClassName = "",
  placeholder = "",
  mask = "",
  maskPlaceholder = null,
  prefix
}) => {
  const { input } = controller();

  return (
    <div className={`input-wrap ${className}`}>
      {label && <label className={lableClassName}>{label}</label>}
      <InputMask
        mask={mask}
        maskPlaceholder={maskPlaceholder}
        autoComplete="off"
        {...input}
      >
        <Input placeholder={placeholder} {...input} prefix={prefix} className={`input ${inputClassName}`} />
      </InputMask>
    </div>
  );
};