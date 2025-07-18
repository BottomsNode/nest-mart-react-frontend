import React from "react";
import { useSelector } from "react-redux";
import { useUserProfile } from "./hooks/useUserProfile";
import { Popup } from "@/components";
import type { RootState } from "@/store";
import { AddressForm, ProfileForm } from "./components";

export const UserProfile: React.FC = () => {
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const {
        loading,
        popup,
        setPopup,
        profileMethods,
        addressMethods,
        handleProfileSubmit,
        handleAddressSubmit,
    } = useUserProfile(userId);

    if (loading) {
        return (
            <div className="min-h-[65vh] flex items-center justify-center text-gray-700">
                Loading profile...
            </div>
        );
    }

    return (
        <>
            <h1 className="text-2xl px-5 font-bold mb-4 text-gray-800 items-center justify-center flex">Profile Settings</h1>
            <div className="min-h-[70vh] flex justify-center bg-gray-100 px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                    <ProfileForm methods={profileMethods} onSubmit={handleProfileSubmit} />
                    <AddressForm methods={addressMethods} onSubmit={handleAddressSubmit} />
                </div>

                <Popup
                    open={popup.open}
                    message={popup.message}
                    severity={popup.severity}
                    onClose={() => setPopup({ ...popup, open: false })}
                />
            </div>
        </>
    );
};
