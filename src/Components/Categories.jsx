import styled from "styled-components";
import { categories } from "../data";
import { CategoriesItem } from "./CategoriesItem";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethod";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;

  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userRequest.get("/categories");
        console.log(res.data);
        setCategories(res.data);
      } catch (err) {
        alert(err);
      }
    };

    fetchData();
  }, []);
  return (
    <Container>
      {categories.map((item) => (
        <CategoriesItem item={item} key={item.id} />
      ))}
    </Container>
  );
};
