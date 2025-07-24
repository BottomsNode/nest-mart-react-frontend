import { useFormContext } from "react-hook-form";
import type { FC, InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    icon?: ReactNode;
}

const InputField: FC<InputFieldProps> = ({ label, name, icon, ...props }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const error = errors?.[name]?.message as string | undefined;

    return (
        <div className="space-y-1 w-full mb-2">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 ">
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    {...register(name)}
                    id={name}
                    {...props}
                    className={`w-full px-4 py-2 ${icon ? "pl-10" : ""
                        } border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-150 ${error ? "border-red-500" : "border-gray-300"
                        }`}
                />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default InputField;