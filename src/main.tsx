import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { SpeedInsights } from "@vercel/speed-insights/next";

createRoot(document.getElementById("root")!).render(
    <>
        <App />
        <SpeedInsights />
    </>
);
