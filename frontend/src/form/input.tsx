import React from "react";
import { Input } from "antd";

import { Controller } from "effector-react-form";

type InputProps = {
    controller: Controller;
    label: React.ReactNode;
    className?: string;
    inputClassName?: string;
    lableClassName?: string;
  };

export const InputField: React.FC<InputProps> = ({ controller, label, className = "", lableClassName = "", inputClassName = ""}) => {
    const { input } = controller();
  
    return (
      <div className={`input-wrap ${className}`}>
        <label className={lableClassName}>{label}</label>
        <Input {...input} value={input.value || ''} className={`input ${inputClassName}`} />
      </div>
    );
  };