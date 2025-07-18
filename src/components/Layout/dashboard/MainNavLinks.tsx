import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Users, ShoppingCart, Heart } from "lucide-react";
import { BadgeNavLink } from "./BadgeNavLink";
import { UserDropdown } from "./UserDropdown";
import user_logo from "@/assets/user.png";

type Props = {
    user: any;
    isAdmin: boolean;
    isManager: boolean;
    wishlistCount: number;
    cartCount: number;
    navLinkClass: ({ isActive }: { isActive: boolean }) => string;
    dropdownOpen: boolean;
    toggleDropdown: () => void;
    dropdownRef: React.RefObject<HTMLLIElement | null>;
};

export const MainNavLinks: React.FC<Props> = ({
    user, isAdmin, isManager,
    wishlistCount, cartCount,
    navLinkClass, dropdownOpen,
    toggleDropdown, dropdownRef
}) => {
    return (
        <>
            <li>
                <NavLink to="/dashboard" end className={navLinkClass}>
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </NavLink>
            </li>

            {(isAdmin || isManager) ? (
                <li>
                    <NavLink to="/dashboard/product-management" end className={navLinkClass}>
                        <Package size={18} />
                        <span>Product Management</span>
                    </NavLink>
                </li>
            ) : (
                <li>
                    <NavLink to="/products" end className={navLinkClass}>
                        <Package size={18} />
                        <span>Products</span>
                    </NavLink>
                </li>
            )}

            {(!isAdmin && !isManager) && (
                <>
                    <li>
                        <BadgeNavLink
                            to="/wishlist"
                            icon={<Heart size={18} />}
                            label="Wishlist"
                            count={wishlistCount}
                            className={navLinkClass}
                            badgeColor="bg-blue-500"
                        />
                    </li>
                    <li>
                        <BadgeNavLink
                            to="/cart"
                            icon={<ShoppingCart size={18} />}
                            label="My Cart"
                            count={cartCount}
                            className={navLinkClass}
                            badgeColor="bg-red-500"
                        />
                    </li>
                </>
            )}

            {(isAdmin || isManager) ? (
                []
            ) : (
                <li>
                    <NavLink to="/orders" end className={navLinkClass}>
                        <Package size={18} />
                        <span>My Orders</span>
                    </NavLink>
                </li>
            )}

            {(isAdmin || isManager) && (
                <li>
                    <NavLink to="/dashboard/user-management" end className={navLinkClass}>
                        <Users size={18} />
                        <span>User Management</span>
                    </NavLink>
                </li>
            )}

            <UserDropdown
                user={user}
                dropdownOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
                dropdownRef={dropdownRef}
                userLogo={user_logo}
            />
        </>
    );
};
