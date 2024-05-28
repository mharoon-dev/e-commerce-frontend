import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/urls.jsx";
import Product from "./Product.jsx";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // console.log(cat , filters, sort);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get(
          cat ? `/products?category=${cat}` : "/products"
        );
        // console.log('API Response:', res.data);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  // console.log('Filtered Products:', filteredProducts);
  useEffect(() => {
    let sortedProducts = [...filteredProducts];
    if (sort === "newest") {
      sortedProducts = sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFilteredProducts(sortedProducts);
      console.log(filteredProducts)
    } else if (sort === "asc") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
      setFilteredProducts(sortedProducts);
      console.log(filteredProducts)
    } else {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
      setFilteredProducts(sortedProducts);
      console.log(filteredProducts)
    }
  }, [sort]);

  return (
    <Container>
      {cat ? filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      ) ) : products.slice(0, 8).map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
