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
import { Link } from "react-router-dom";

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
        <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 animate-fade-in-up">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-blue-700 mb-2">Welcome Back</h2>
                    <p className="text-sm text-gray-500">Enter your login credentials below</p>
                </div>

                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit((data) => login(data))}
                        className="space-y-5"
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
                                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Forgot your password?</span>
                            <Link to="/reset-password" className="text-blue-600 hover:underline">
                                Reset
                            </Link>
                        </div>

                        {loading && <Loader overlay size={40} color="#007BFF" />}

                        <div className="pt-2">
                            <CommonButton
                                type="submit"
                                text="Login"
                                disabled={loading}
                                className="w-full"
                            />
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
        </div>
    );
};
