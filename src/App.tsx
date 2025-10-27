// Import libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";

// Import pages
import Home from "./pages/Home";

// Import constants
import routes from "./constants/routes";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.HOME.route} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
