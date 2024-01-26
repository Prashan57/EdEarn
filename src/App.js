import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Context from "./context/context";

function App() {
  return (
    <div className="App">
      <Context>
        <BrowserRouter>
          <Routes>
            {routes.map((items, index) => (
              <Route key={index} path={items.path} element={items.element} />
            ))}
          </Routes>
        </BrowserRouter>
      </Context>
    </div>
  );
}

export default App;
