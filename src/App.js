import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map((items) => (
            <Route path={items.path} element={items.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
