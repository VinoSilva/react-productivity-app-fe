// Import libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// Import pages
import Home from "./pages/Home";

// Import constants
import routes from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME.route} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
