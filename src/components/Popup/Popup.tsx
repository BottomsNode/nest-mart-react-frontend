import React from "react";
import { Snackbar, Alert, type AlertColor, AlertTitle } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";

interface PopupProps {
    severity: AlertColor;
    message: string;
    open: boolean;
    onClose: () => void;
    title?: string;
    anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
    variant?: 'filled' | 'outlined' | 'standard';
}

const iconMap = {
    success: <CheckCircleIcon fontSize="inherit" />,
    info: <InfoIcon fontSize="inherit" />,
    warning: <WarningAmberIcon fontSize="inherit" />,
    error: <ErrorIcon fontSize="inherit" />,
};

export const Popup: React.FC<PopupProps> = ({
    severity,
    message,
    open,
    onClose,
    title,
    anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
    variant = 'filled',
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant={variant}
                icon={iconMap[severity]}
                sx={{
                    minWidth: 300,
                    boxShadow: 4,
                    borderRadius: 2,
                    ...(severity === 'success' && {
                        background: 'linear-gradient(90deg, #1dd1a1, #10ac84)',
                        color: 'black',
                    }),
                    ...(severity === 'info' && {
                        background: 'linear-gradient(90deg, #54a0ff, #2e86de)',
                        color: 'black',
                    }),
                    ...(severity === 'error' && {
                        background: '#ff6b6b',
                        color: 'black',
                    }),
                    ...(severity === 'warning' && {
                        background: '#feca57',
                        color: 'black',
                    }),
                }}
            >
                {title && <AlertTitle>{title}</AlertTitle>}
                {message}
            </Alert>
        </Snackbar>
    );
};
