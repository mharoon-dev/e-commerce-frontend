import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/urls.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noAvatar from "../../public/assets/noAvatar.png";

const KEY =
  "pk_test_51PDVVW2MdE2JOYS8Rd1YZfj0TgyH2vagXXRrlLYbaihyFv3tng7cgdL7q2PXebA3kqBz8I63lN4bfzpEGhfw5lDs00CXYwLMpm";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 100px;
  border-radius: 5px;
  padding: 15px;
  background-color: black;
  color: white;
  cursor: pointer;
  border: none;
`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

function Pay() {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    // console.log(token)
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await api.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 2000,
        });
        console.log(res.data);
        navigate("/success");
      } catch (error) {
        console.error(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken , navigate]);
  return (
    <>
      <Container>
        {stripeToken ? (
          <h2>Processing. Please wait...</h2>
        ) : (
          <StripeCheckout
            name="online shop"
            image={noAvatar}
            billingAddress
            shippingAddress
            description="Your total is $20"
            amount={2000}
            token={onToken}
            stripeKey={KEY}
          >
            <Button>PAY NOW</Button>
          </StripeCheckout>
        )}
      </Container>
    </>
  );
}

export default Pay;
