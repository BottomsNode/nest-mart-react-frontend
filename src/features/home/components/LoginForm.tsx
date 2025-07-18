import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../models";
import { InputField } from "@/components";
import { CommonButton } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { Popup } from "@/components/Popup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useLogin } from "../hooks";

export const LoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const methods = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const from = "/dashboard";

    const {
        login,
        loading,
        alertSeverity,
        alertMessage,
        openSnackbar,
        handleCloseSnackbar,
    } = useLogin(from);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
            <h2 className="text-3xl font-extrabold text-center text-black mb-6">
                Enter Your Login Details
            </h2>

            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit((data) => login(data))}
                    className="max-w-md w-full p-6 bg-white rounded-md shadow-md space-y-6"
                >
                    <InputField
                        name="email"
                        label="Email"
                        placeholder="you@example.com"
                        autoComplete="email"
                    />

                    <div className="relative">
                        <InputField
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>

                    {loading && <Loader size={40} color="#007BFF" />}

                    <div className="flex justify-center pt-4">
                        <CommonButton type="submit" text="Login" disabled={loading} />
                    </div>
                </form>
            </FormProvider>

            <Popup
                severity={alertSeverity}
                message={alertMessage}
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </div>
    );
};