import Link from "next/link";
import React from "react";

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    link?: string;
    ios?: boolean;
    websiteUrl?: string;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    disabled,
    children,
    link,
    ios,
    websiteUrl,
}) => {
    if (link) {
        return (
            <div
                className={ios ? "button apple" : "button external"}
                style={!websiteUrl ? { marginLeft: 0 } : {}}
            >
                <a href={link} target="_blank" rel="noreferrer">
                    <button>{children}</button>
                </a>
            </div>
        );
    }

    return (
        <div className="button">
            <button onClick={onClick} disabled={disabled}>
                {children}
            </button>
        </div>
    );
};

export default Button;
