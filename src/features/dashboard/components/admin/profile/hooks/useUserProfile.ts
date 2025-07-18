import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema, addressSchema, type UserProfileFormValues, type AddressFormValues } from "@/features/dashboard/models";
import axiosInstance from "@/api/handler";

export const useUserProfile = (userId?: number) => {
    const [loading, setLoading] = useState(true);
    const [popup, setPopup] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success",
    });

    const profileMethods = useForm<UserProfileFormValues>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: { name: "", email: "", phone: "" },
    });

    const addressMethods = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: { street: "", city: "", pincode: "" },
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;

            try {
                const res = await axiosInstance.get(`/user/${userId}`);
                const { name, email, phone, address } = res.data;

                profileMethods.reset({ name, email, phone });

                if (address) {
                    addressMethods.reset({
                        street: address.street || "",
                        city: address.city || "",
                        pincode: address.pincode || "",
                    });
                }
            } catch (err) {
                setPopup({ open: true, message: "Failed to load user data.", severity: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const handleProfileSubmit = async (data: UserProfileFormValues) => {
        if (!userId) return;

        try {
            await axiosInstance.put(`/user/${userId}`, data);
            setPopup({ open: true, message: "Profile updated successfully!", severity: "success" });
        } catch {
            setPopup({ open: true, message: "Failed to update profile.", severity: "error" });
        }
    };

    const handleAddressSubmit = async (data: AddressFormValues) => {
        if (!userId) return;

        try {
            await axiosInstance.put(`/user/${userId}/address`, data);
            setPopup({ open: true, message: "Address updated successfully!", severity: "success" });
        } catch {
            setPopup({ open: true, message: "Failed to update address.", severity: "error" });
        }
    };

    return {
        loading,
        popup,
        setPopup,
        profileMethods,
        addressMethods,
        handleProfileSubmit,
        handleAddressSubmit,
    };
};
