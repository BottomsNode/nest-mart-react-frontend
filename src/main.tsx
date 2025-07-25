import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById("root")!).render(
    <>
        <App />
        <SpeedInsights />
        <Analytics />
    </>
);
