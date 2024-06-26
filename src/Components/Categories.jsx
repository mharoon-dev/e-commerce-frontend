import styled from "styled-components";
import { categories } from "../data";
import { CategoriesItem } from "./CategoriesItem";
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;

    ${mobile({ padding: "0px", flexDirection: "column" })}
`;

export const Categories = () => {
  return (
      <Container>
        {categories.map((item) => (
          <CategoriesItem item={item} key={item.id} />
        ))}
      </Container>
  )
};
