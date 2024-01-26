import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Chat from "./pages/Chat";
function App() {
  return (
    <div className="App">
      <Chat room="room1" />
      {/* <BrowserRouter>
        <Routes>
          {routes.map((items) => (
            <Route path={items.path} element={items.element} />
          ))}
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
