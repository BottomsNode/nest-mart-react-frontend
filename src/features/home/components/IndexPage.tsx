import { useEffect, useState, type FC } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Popup } from "@/components";

const IndexPage: FC = () => {
  const location = useLocation();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  useEffect(() => {
    if (location.state?.logout) {
      setShowLogoutPopup(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">

      <section className="flex flex-col items-center justify-center text-center py-5 px-4 animate-fade-in-up">
        <div className="flex justify-center mb-4">
          <Sparkles className="text-blue-500 w-12 h-12 animate-pulse" />
        </div>
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 leading-tight">
          Welcome to <span className="text-indigo-600">NestMart</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Your one-stop destination for curated, high-quality products at unbeatable prices.
          Experience seamless shopping, fast delivery, and outstanding support.
        </p>

        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-md font-semibold rounded-full shadow-lg transition"
        >
          Start Shopping
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
          <ShoppingBag className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Wide Range of Products</h3>
          <p className="text-gray-600">
            Explore electronics, fashion, home essentials and more — all in one place.
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
          <Truck className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Fast & Reliable Delivery</h3>
          <p className="text-gray-600">
            Get your orders delivered quickly and securely, no matter where you are.
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl hover:shadow-md transition">
          <CheckCircle className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Trusted by Thousands</h3>
          <p className="text-gray-600">
            Join our community of happy customers who love shopping with NestMart.
          </p>
        </div>
      </section>

      <Popup
        severity="info"
        open={showLogoutPopup}
        onClose={() => setShowLogoutPopup(false)}
        message="You have been logged out"
        title="Session Ended"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </div>
  );
};

export default IndexPage;
