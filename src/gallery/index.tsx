import { createRoot } from "react-dom/client";

const App = () => {
  return <h2>Hello world</h2>;
};

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
