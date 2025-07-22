import type { RootState } from "@/store";
import { useDashboardHeader, useNavClasses } from "../hooks";
import { useSelector } from "react-redux";
import { LogoBrand } from "../others";
import { FaBars, FaTimes } from "react-icons/fa";
import { MainNavLinks, MobileNavLinks } from "../links";

export const DashboardHeader: React.FC = () => {
    const {
        user,
        dropdownOpen,
        toggleDropdown,
        mobileMenuOpen,
        toggleMobileMenu,
        dropdownRef,
        isAdmin,
        isManager,
    } = useDashboardHeader();

    const { navLinkClass, mobileNavClass } = useNavClasses();

    const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);
    const cartCount = useSelector((state: RootState) =>
        state.cart.items.reduce((acc, item) => acc + item.qty, 0)
    );

    return (
        <header className="bg-gray-700 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">

                <LogoBrand />

                <button className="md:hidden" onClick={toggleMobileMenu}>
                    {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* All Descktop Links */}
                <ul className="hidden md:flex space-x-6 items-center">
                    <MainNavLinks
                        user={user}
                        isAdmin={isAdmin}
                        isManager={isManager}
                        wishlistCount={wishlistCount}
                        cartCount={cartCount}
                        navLinkClass={navLinkClass}
                        dropdownOpen={dropdownOpen}
                        toggleDropdown={toggleDropdown}
                        dropdownRef={dropdownRef}
                    />
                </ul>
            </div>

            {/* All mobile links */}
            {mobileMenuOpen && (
                <MobileNavLinks
                    isAdmin={isAdmin}
                    isManager={isManager}
                    wishlistCount={wishlistCount}
                    cartCount={cartCount}
                    toggleMobileMenu={toggleMobileMenu}
                    mobileNavClass={mobileNavClass}
                />
            )}
        </header>
    );
};
