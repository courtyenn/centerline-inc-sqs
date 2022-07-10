import { createRoot } from "react-dom/client";
import { Gallery } from "./Gallery";

const App = () => {
  return (
    <div>
      <Gallery />
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
