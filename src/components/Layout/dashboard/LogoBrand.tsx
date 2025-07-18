import { NavLink } from "react-router-dom";
import logo from "@/assets/web_logo.jpg";

export const LogoBrand = () => (
    <NavLink to="/dashboard" className="flex items-center space-x-3">
        <img src={logo} alt="Nest-Mart Logo" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-semibold">Nest-Mart Shop</span>
    </NavLink>
);