import React from "react";

import "./BoxShadow.css";

export const BoxShadow: React.FC<{children: any, className?: string}> = ({children, className = ""}) => {
    return (
        <div className={`box-shadow-wrapper ${className}`}>
            {children}
        </div>
    );
}