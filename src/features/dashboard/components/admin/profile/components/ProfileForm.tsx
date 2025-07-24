import { FormProvider } from "react-hook-form";
import type { UserProfileFormValues } from "@/features/dashboard/models";
import type { UseFormReturn } from "react-hook-form";
import { lazy } from "react";

const InputField = lazy(()=> import("@/components/Form/InputField"));

type Props = {
    methods: UseFormReturn<UserProfileFormValues>;
    onSubmit: (data: UserProfileFormValues) => void;
};

const ProfileForm = ({ methods, onSubmit }: Props) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Profile Information</h2>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <InputField name="name" label="Name" autoComplete="name" />
                <InputField name="email" label="Email" type="email" autoComplete="email" />
                <InputField name="phone" label="Phone" autoComplete="tel" />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={methods.formState.isSubmitting}
                >
                    {methods.formState.isSubmitting ? "Saving..." : "Save Profile"}
                </button>
            </form>
        </FormProvider>
    </div>
);

export default ProfileForm;