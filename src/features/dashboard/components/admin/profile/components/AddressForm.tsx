import { FormProvider } from "react-hook-form";
import { InputField } from "@/components";
import type { AddressFormValues } from "@/features/dashboard/models";
import type { UseFormReturn } from "react-hook-form";

type Props = {
    methods: UseFormReturn<AddressFormValues>;
    onSubmit: (data: AddressFormValues) => void;
};

export const AddressForm = ({ methods, onSubmit }: Props) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Address Details</h2>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <InputField name="street" label="Street" />
                <InputField name="city" label="City" />
                <InputField name="pincode" label="Pincode" />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
                    disabled={methods.formState.isSubmitting}
                >
                    {methods.formState.isSubmitting ? "Saving..." : "Save Address"}
                </button>
            </form>
        </FormProvider>
    </div>
);
