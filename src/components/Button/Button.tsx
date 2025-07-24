import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'destructive';

interface CommonButtonProps {
    text: string;
    onClick?: () => void;
    variant?: ButtonVariant;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
    text,
    onClick,
    variant = 'primary',
    type = 'button',
    disabled = false,
    className = '',
}) => {
    const baseStyles =
        'px-5 py-2 rounded-md font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';

    let variantStyles = '';
    switch (variant) {
        case 'primary':
            variantStyles =
                'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500';
            break;
        case 'secondary':
            variantStyles =
                'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-500';
            break;
        case 'outline':
            variantStyles =
                'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white active:bg-blue-700 focus:ring-blue-500';
            break;
        case 'destructive':
            variantStyles =
                'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500';
            break;
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles} ${className}`}
        >
            {text}
        </button>
    );
};

export default CommonButton