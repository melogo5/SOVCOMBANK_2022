import React from "react";

import "./CenterContent.css";

interface CenterContentProps {
    children: any;
    className?: string;
    taCenter?: boolean;
}

export const CenterContent: React.FC<CenterContentProps> = ({ children, className = "", taCenter}) => {
    const classNames = `center-content-wrapper ${className} ${taCenter ? "center-content-taCenter" : ""}`;

    return (
        <div className={classNames}>
            {children}
        </div>
    );
}