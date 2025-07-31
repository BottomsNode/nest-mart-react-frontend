import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import axiosInstance from "@/api/handler";
import { signupSchema, type SignupFormValues } from "@/features/dashboard/models";
import { getFieldsForStep } from "../components";


interface MyErroType {
    message: string
    path: string
    statusCode: number
    timestamp: string
}
export const TOTAL_STEPS = 2;

export const useSignupForm = () => {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupSeverity, setPopupSeverity] = useState<"success" | "error">("success");

    const navigate = useNavigate();

    const methods = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address: {
                street: "",
                city: "",
                pincode: "",
            },
        },
    });

    const onNext = async () => {
        const isValid = await methods.trigger(getFieldsForStep(step));
        if (isValid) setStep((prev) => prev + 1);
    };

    const onBack = () => setStep((prev) => prev - 1);

    const onSubmit = async (data: SignupFormValues) => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.post("/user", data);

            setTimeout(() => {
                setPopupMessage("User created successfully!");
                setPopupSeverity("success");
                setPopupOpen(true);
                setTimeout(() => navigate("/dashboard"), 1000);
            }, 1000);
        } catch (err: MyErroType | any) {
            setError("An error occurred. Please try again.");
            setTimeout(() => {
                setPopupMessage(`${err.response.data.message}`);
                setPopupSeverity("error");
                setPopupOpen(true);
            }, 1000);
        } finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };

    return {
        step,
        setStep,
        showPassword,
        setShowPassword,
        loading,
        error,
        popupOpen,
        popupMessage,
        popupSeverity,
        setPopupOpen,
        methods,
        onNext,
        onBack,
        onSubmit,
    };
};
