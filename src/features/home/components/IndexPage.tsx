import { type FC } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const IndexPage: FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="text-center animate-fade-in-up">
        <div className="flex justify-center mb-4">
          <Sparkles className="text-blue-500 w-12 h-12 animate-pulse" />
        </div>
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
          Welcome to <span className="text-indigo-600">NestMart</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
          Your one-stop destination for curated, quality products at unbeatable prices.
        </p>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-full shadow transition"
        >
          Start Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
