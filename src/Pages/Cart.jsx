import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/urls.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethod.js";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const KEY =
  "pk_test_51PDVVW2MdE2JOYS8Rd1YZfj0TgyH2vagXXRrlLYbaihyFv3tng7cgdL7q2PXebA3kqBz8I63lN4bfzpEGhfw5lDs00CXYwLMpm";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Buttonn = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const quantity = useSelector((state) => state.cart.quantity);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createOrder = async () => {
    try {
      const res = await userRequest.post("/orders", {
        userId: currentUser._id,
        products: cart.products.map((item) => ({
          productId: item._id,
          quantity: item._quantity,
        })),
        amount: cart.total,
        address: data.billing_details.address,
      });
      setOrderId(res.data._id);
    } catch {}
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 2000,
        });
        console.log(res.data);
        navigate("/success", { data: res.data });
      } catch (error) {
        console.error(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  const cart = useSelector((state) => state.cart);
  console.log(cart.products);
  return (
    <>
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                CONTINUE SHOPPING
              </Link>
            </TopButton>
            <TopTexts>
              <TopText>Shopping Bag ({cart.products.length})</TopText>
            </TopTexts>
          </Top>
          <Bottom>
            <Info>
              {cart?.products?.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>

                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>
                      ${product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>{cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>0</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>0</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>{cart.total}</SummaryItemPrice>
              </SummaryItem>

              <Buttonn onClick={handleOpen}>ORDER NOW</Buttonn>
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              Cash on delivery{" "}
              <input
                type="checkbox"
                style={{ transform: "scale(1.9)!important" }}
              />
            </div>
          </Typography>
          <h4 style={{ marginBottom: "10px" }}>Total = {cart.total} </h4>
          <Buttonn onClick={handleOpen}>ORDER NOW</Buttonn>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
