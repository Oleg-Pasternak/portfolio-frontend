import Link from 'next/link';
import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    link?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children, link }) => {
    if (link) {
        return (
            <div className="button">
                <a href={link} target='_blank'>
                    <button className='external'>
                        {children}
                    </button>
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
