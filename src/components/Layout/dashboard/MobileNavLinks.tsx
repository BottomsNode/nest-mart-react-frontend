import { NavLink } from "react-router-dom";

type Props = {
    isAdmin: boolean;
    isManager: boolean;
    wishlistCount: number;
    cartCount: number;
    toggleMobileMenu: () => void;
    mobileNavClass: ({ isActive }: { isActive: boolean }) => string;
};

export const MobileNavLinks: React.FC<Props> = ({
    isAdmin, isManager,
    wishlistCount, cartCount,
    toggleMobileMenu, mobileNavClass
}) => {
    return (
        <ul className="md:hidden bg-gray-800 text-white p-4 space-y-3 mt-2 rounded-md">
            <li>
                <NavLink to="/dashboard" className={({ isActive }) => mobileNavClass({ isActive })}>
                    Dashboard
                </NavLink>
            </li>

            {(!isAdmin && !isManager) && (
                <>
                    <li>
                        <NavLink to="/products" onClick={toggleMobileMenu} className={({ isActive }) => mobileNavClass({ isActive })}>
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/wishlist" onClick={toggleMobileMenu} className={({ isActive }) => mobileNavClass({ isActive })}>
                            Wishlist {wishlistCount > 0 && <span className="ml-1 text-sm text-blue-400">({wishlistCount})</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" onClick={toggleMobileMenu} className={({ isActive }) => mobileNavClass({ isActive })}>
                            My Cart {cartCount > 0 && <span className="ml-1 text-sm text-red-400">({cartCount})</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/orders" onClick={toggleMobileMenu} className={({ isActive }) => mobileNavClass({ isActive })}>
                            My Orders {cartCount > 0 && <span className="ml-1 text-sm text-red-400">({cartCount})</span>}
                        </NavLink>
                    </li>
                </>
            )}

            {(isAdmin || isManager) && (
                <li>
                    <NavLink to="/dashboard/user-management" onClick={toggleMobileMenu} className={({ isActive }) => mobileNavClass({ isActive })}>
                        Users Management
                    </NavLink>
                </li>
            )}
            {(isAdmin || isManager) && (
                <li>
                    <NavLink to="/dashboard/product-management" onClick={toggleMobileMenu} className={({ isActive }) => mobileNavClass({ isActive })}>
                        Users Management
                    </NavLink>
                </li>
            )}

            <li className="border-t border-gray-600 pt-2">
                <NavLink to="/dashboard/profile" onClick={toggleMobileMenu} className={({ isActive }) => mobileNavClass({ isActive })}>
                    My Profile
                </NavLink>
                <NavLink to="/dashboard/settings" onClick={toggleMobileMenu} className={({ isActive }) => mobileNavClass({ isActive })}>
                    Settings
                </NavLink>
                <NavLink to="/dashboard/logout" onClick={toggleMobileMenu} className={({ isActive }) => mobileNavClass({ isActive })}>
                    Logout
                </NavLink>
            </li>
        </ul>
    );
};
