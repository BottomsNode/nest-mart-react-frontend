import { lazy, type FC } from "react";
import { FormProvider } from "react-hook-form";
import { SignupStep1, SignupStep3 } from "./components";
import { Loader } from "@/components";
import { useSignupForm, TOTAL_STEPS } from "./hooks";
import { motion, AnimatePresence } from "framer-motion";

const Popup = lazy(()=> import("@/components/Popup/Popup"));
const CommonButton = lazy(()=> import("@/components/Button/Button"));

const SignupForm: FC = () => {
    const {
        step,
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
        <div className="min-h-[75vh] flex items-center justify-center bg-gray-50 px-4 py-4">
            <div className="w-full max-w-xl bg-white p-5 rounded-2xl shadow-lg space-y-8">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    ></div>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Create New User – Step {step}
                    </h2>
                    {error && (
                        <p className="text-sm text-red-600 mt-2">{error}</p>
                    )}
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {step === 1 && <SignupStep1 />}
                                {step === 2 && <SignupStep3 />}
                            </motion.div>
                        </AnimatePresence>

                        {loading && (
                            <div className="flex justify-center">
                                <Loader size={32} color="#007BFF" />
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 pt-4">
                            {step > 1 && (
                                <CommonButton
                                    type="button"
                                    onClick={onBack}
                                    text="Back"
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                />
                            )}
                            {step < TOTAL_STEPS ? (
                                <CommonButton
                                    type="button"
                                    onClick={onNext}
                                    text="Next"
                                    className="w-full sm:w-auto"
                                />
                            ) : (
                                <CommonButton
                                    type="submit"
                                    text="Create User"
                                    className="w-full sm:w-auto"
                                />
                            )}
                        </div>
                    </form>
                </FormProvider>

            </div>

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

export default SignupForm;
