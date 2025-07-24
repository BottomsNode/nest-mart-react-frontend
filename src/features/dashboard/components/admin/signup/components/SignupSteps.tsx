import { FaEye, FaEyeSlash } from "react-icons/fa";
import { lazy, type Dispatch, type SetStateAction } from "react";
import type { SignupFormValues } from "@/features/dashboard/models";

const InputField = lazy(()=> import("@/components/Form/InputField"));

export const SignupStep1 = () => (
    <>
        <InputField name="name" label="Full Name" placeholder="User's full name" autoComplete="name"/>
        <InputField name="phone" label="Phone" placeholder="1234567890" autoComplete="tel" />
        <InputField name="email" label="Email" type="email" placeholder="user@example.com" autoComplete="email" />
    </>
);

export const SignupStep2 = ({ showPassword, setShowPassword }: { showPassword: boolean; setShowPassword: Dispatch<SetStateAction<boolean>> }) => (
    <>
        <input type="email" hidden readOnly autoComplete="username" />
        <div className="relative">
            <InputField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                autoComplete="new-password"
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
            >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
        </div>
    </>
);

export const SignupStep3 = () => (
    <>
        <InputField name="address.street" label="Street" placeholder="123 Main St" />
        <InputField name="address.city" label="City" placeholder="City" />
        <InputField name="address.pincode" label="Pincode" placeholder="Postal Code" />
    </>
);

export const getFieldsForStep = (
    step: number
): (keyof SignupFormValues | `address.${keyof SignupFormValues["address"]}`)[] => {
    switch (step) {
        case 1:
            return ["name", "phone", "email"];
        case 2:
            return ["password"];
        case 3:
            return ["address.street", "address.city", "address.pincode"];
        default:
            return [];
    }
};
