import { useState } from "react";

export const usePopup = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const showPopup = (msg: string) => {
        setMessage(msg);
        setOpen(true);
    };

    return {
        popupOpen: open,
        popupMessage: message,
        showPopup,
        closePopup: () => setOpen(false),
    };
};
