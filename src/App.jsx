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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "./utils/urls";
import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../admin/src/Redux/Slices/userSlice";

function App() {
  const user = useSelector((state) => state?.user?.currentUser);
  console.log(user);
  const dispatch = useDispatch();

  const api = axios.create({
    baseURL: BASE_URL,
  });

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) return dispatch(loginFailure()) && console.log("no token");

      dispatch(loginStart());

      try {
        const res = await api.get("/auth/isuserloggedin", {
          headers: { authorization: `Bearer ${token}` },
        });
        if (res.data) {
          console.log(res.data);
          dispatch(loginSuccess(res.data));
        }
      } catch (error) {
        console.log(error);
        dispatch(loginFailure(error));
      }
    };

    isUserLoggedIn();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/pay" element={<Pay />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
