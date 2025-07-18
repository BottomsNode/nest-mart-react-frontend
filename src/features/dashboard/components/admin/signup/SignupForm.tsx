import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import { SignupStep1, SignupStep2, SignupStep3 } from "./components";
import { CommonButton, Loader, Popup } from "@/components";
import { useSignupForm, TOTAL_STEPS } from "./hooks";

export const SignupForm: FC = () => {
    const {
        step,
        showPassword,
        setShowPassword,
        loading,
        error,
        popupOpen,
        popupMessage,
        popupSeverity,
        methods,
        onNext,
        onBack,
        onSubmit,
        setPopupOpen,
    } = useSignupForm();

    return (
        <div className="min-h-[78vh] flex flex-col items-center justify-center bg-gray-50 px-4">
            <h2 className="text-3xl font-extrabold text-center text-black mb-6">
                Create New User – Step {step}
            </h2>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="max-w-md w-full p-6 bg-white rounded-md shadow-md space-y-6"
                >
                    {step === 1 && <SignupStep1 />}
                    {step === 2 && <SignupStep2 showPassword={showPassword} setShowPassword={setShowPassword} />}
                    {step === 3 && <SignupStep3 />}

                    {loading && <Loader size={40} color="#007BFF" />}

                    <div className="flex justify-between pt-4">
                        {step > 1 && <CommonButton type="button" onClick={onBack} text="Back" variant="outline" />}
                        {step < TOTAL_STEPS ? (
                            <CommonButton type="button" onClick={onNext} text="Next" />
                        ) : (
                            <CommonButton type="submit" text="Create User" />
                        )}
                    </div>
                </form>
            </FormProvider>

            <Popup
                open={popupOpen}
                message={popupMessage}
                severity={popupSeverity}
                onClose={() => setPopupOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </div>
    );
};