import { type FC, lazy, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "../models";
import { motion } from "framer-motion";

const CommonButton = lazy(()=> import("@/components/Button/Button"));
const InputField = lazy(()=> import("@/components/Form/InputField"));
const TextareaField = lazy(()=> import("@/components/Form/TextareaField"));

const ContactPage: FC = () => {
    const [mapSrc, setMapSrc] = useState("");

    const methods = useForm<ContactFormValues>({
        mode: "onBlur",
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    useEffect(() => {
        setMapSrc(
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.7020808886673!2d72.51555317428704!3d23.07138137913959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e835738a39dd3%3A0x1dc78c11d69ddb22!2seSparkBiz%20-%20Agile%20Teams%20On-demand!5e0!3m2!1sen!2sin!4v1752477342940!5m2!1sen!2sin"
        );
    }, []);

    const onSubmit = (_data: ContactFormValues) => {
        // Future integration: Send to backend or show a toast/snackbar
    };

    return (
        <div className="h-full flex items-center justify-center bg-gradient-to-tr from-blue-50 to-white p-4">
            <motion.div
                className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* Form Side */}
                    <div className="p-10 flex flex-col justify-center">
                        <h2 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">
                            ✉️ Contact Us
                        </h2>

                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                                <InputField
                                    name="name"
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                />
                                <InputField
                                    name="email"
                                    label="Email Address"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                <TextareaField
                                    id="message"
                                    name="message"
                                    label="Message"
                                    placeholder="Enter your message"
                                />
                                <div className="flex justify-center pt-4">
                                    <CommonButton type="submit" text="Send Message" className="px-6" />
                                </div>
                            </form>
                        </FormProvider>
                    </div>

                    {/* Map Side */}
                    <div className="relative bg-gray-200 min-h-[400px] lg:min-h-full">
                        {mapSrc ? (
                            <iframe
                                src={mapSrc}
                                width="100%"
                                height="100%"
                                className="absolute inset-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="eSparkBiz Location"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-gray-600">Loading map...</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactPage