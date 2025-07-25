import { Suspense, useEffect, useState, type FC } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import clsx from "clsx";

export const AppLayout: FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header (show/hide on scroll) */}
      <div
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out",
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <Header />
      </div>

      {/* Main content with top padding */}
      <main className="flex-grow pt-20 px-4">
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
