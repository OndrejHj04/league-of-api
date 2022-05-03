import { createRoot } from "react-dom/client";
import Routes from "./Routes";

import "./style.css";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript



root.render(
    <Routes />
);
