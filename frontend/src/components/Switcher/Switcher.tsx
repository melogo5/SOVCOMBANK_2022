import React from "react";

import "./Switcher.css";

interface SwitcherProps {
    options: Array<{ value: string; label: string; }>
    callback: (params: any) => void;
    active: string;
};

export const Switcher: React.FC<SwitcherProps> = params => {
    const { options, active, callback } = params;
    const numberOfOptions = options.length;

    return (
        <div className="switcher-wrapper">
            {options.map(e => (
                <div
                    key={e.value}
                    style={{ width: `${Math.floor(100 / numberOfOptions)}%` }}
                    onClick={() => callback(e.value)}
                    className={`switcher-option ${e.value === active ? "switcher-option-active" : ""}`}
                >
                    {e.label}
                </div>
            ))}
        </div>
    );
}