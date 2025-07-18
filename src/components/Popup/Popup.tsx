import React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { Snackbar } from "@mui/material";

interface PopupProps {
    severity: 'success' | 'info' | 'warning' | 'error';
    message: string;
    open: boolean;
    onClose: () => void;
    anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
}

export const Popup: React.FC<PopupProps> = ({ severity, message, open, onClose, anchorOrigin = { vertical: 'bottom', horizontal: 'center' } }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                iconMapping={{
                    success: <CheckIcon />,
                    info: <CheckIcon />,
                    warning: <CheckIcon />,
                    error: <CheckIcon />,
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
