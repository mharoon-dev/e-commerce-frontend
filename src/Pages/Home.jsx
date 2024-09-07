import React from "react";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Slider from "../Components/Slider";
import { Categories } from "../Components/Categories";
import Products from "../Components/Products";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";

const Home = ({ refUsersTotal, setRefUsersTotal }) => {
  return (
    <>
      <Announcement />
      <Navbar
        refUsersTotal={refUsersTotal}
        setRefUsersTotal={setRefUsersTotal}
      />
      <Slider />
      <Categories />
      <Products />
      {/* <NewsLetter /> */}
      <Footer />
    </>
  );
};

export default Home;
