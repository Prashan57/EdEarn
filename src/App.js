import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";

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
