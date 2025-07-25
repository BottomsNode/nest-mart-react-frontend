import React, { lazy, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { resetPwdSchema, type ResetPasswordFormValues } from "../models/resetPwd";
import { Loader } from "@/components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "@/api/handler";
import { Link } from "react-router-dom";

const Popup = lazy(() => import("@/components/Popup/Popup"));
const CommonButton = lazy(() => import("@/components/Button/Button"));
const InputField = lazy(() => import("@/components/Form/InputField"));

const ResetPasswordForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

    const navigate = useNavigate();

    const methods = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPwdSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: ResetPasswordFormValues) => {
        setLoading(true);

        try {
            await axiosInstance.put("/user/password/reset", {
                email: data.email,
                password: data.password,
            });

            setAlertMessage("Password successfully reset!");
            setAlertSeverity("success");
            setOpenSnackbar(true);

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to reset password.";
            setAlertMessage(message);
            setAlertSeverity("error");
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loader overlay={true} />}
            <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 animate-fade-in-up">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-blue-700 mb-2">Reset Password</h2>
                        <p className="text-sm text-gray-500">Enter your email and new password below</p>
                    </div>

                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                            <InputField name="email" label="Email" type="email" placeholder="Enter your email" autoComplete="email" />

                            <div className="relative">
                                <InputField
                                    name="password"
                                    label="New Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
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

                            <div className="relative">
                                <InputField
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Re-enter password"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm((prev) => !prev)}
                                    className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showConfirm ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>

                            <div className="flex justify-center">
                                <CommonButton type="submit" text="Reset Password" className="w-full"/>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Go to Login Page 
                                    <Link to="/login" className="text-blue-600 hover:underline">
                                        <span className="text-blue-600">Click Here</span>
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </FormProvider>

                    <Popup
                        severity={alertSeverity}
                        message={alertMessage}
                        open={openSnackbar}
                        onClose={() => setOpenSnackbar(false)}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    />
                </div>
            </div>
        </>
    );
};

export default ResetPasswordForm