import "./App.css";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Product from "./Pages/Product";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Pay from "./Components/Pay";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Payment } from "@mui/icons-material";
import Success from "./Components/Success";

function App() {
  return (
    <>
          <BrowserRouter>
        <Routes>
          <Route
            path="/pay"
            element={<Pay />}
          />
          <Route
            path="/success"
            element={<Success />}
          />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
