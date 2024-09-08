import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethod.js";

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const UserName = styled.span`
  font-weight: bold;
  margin-left: 10px;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

// modals
const Modal = styled.div`
  height: 100vh;
  position: fixed;
  width: 100%;
  z-index: 9999;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
`;

const ModalTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 10px !important;
`;

const ModalData = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const WinDraw = styled.button`
  padding: 10px 30px;
  font-size: 20px;
  margin-top: 15px;
  background-color: transparent;
  cursor: pointer;
`;
const LogoutButton = styled.button`
  padding: 10px 30px;
  font-size: 20px;
  margin-top: 15px;
  background-color: transparent;
  cursor: pointer;
`;

function Navbar({ refUsersTotal, setRefUsersTotal }) {
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(refUsersTotal);
  }, [refUsersTotal]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (user) {
  //       let total = 0;

  //       await Promise.all(
  //         user?.data?.refrenceUsers.map(async (userId) => {
  //           const response = await userRequest.get(`/orders/find/${userId}`);

  //           response?.data?.forEach((order) => {
  //             let currentAmount = order.amount;
  //             total += currentAmount;
  //             setRefUsersTotal(total);
  //           });
  //         })
  //       );
  //     }
  //   };

  //   fetchData();
  // }, [user]);

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  const winDrawHandle = () => {
    
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            {user && (
              <>
                <UserImg
                  src={
                    user?.data?.img ||
                    user?.img ||
                    "https://i.ibb.co/MBtjqGJ/avatar.png"
                  }
                  onClick={() => setShowModal(true)}
                />
                <UserName>
                  {(user && user?.data?.username) || user?.username}
                </UserName>
              </>
            )}
            {!user && (
              <>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>REGISTER</MenuItem>
                </Link>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>SIGN IN</MenuItem>
                </Link>
              </>
            )}
          </Left>
          <Center>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              <Logo>Online Store</Logo>
            </Link>
          </Center>
          <Right>
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="secondary">
                  <ShoppingCartOutlinedIcon color="action" />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>

      {showModal && (
        <Modal onClick={handleModalClick}>
          <ModalContainer>
            <ModalImg
              src={
                user?.data?.img ||
                user?.img ||
                "https://i.ibb.co/MBtjqGJ/avatar.png"
              }
            />
            <ModalTitle>{user && user?.data?.username}</ModalTitle>
            <ModalData>
              Email: {(user && user?.data?.email) || user?.email}
            </ModalData>

            {user?.data?.refrenceCode ? (
              <ModalData>
                Reference Code:{" "}
                {user?.data?.refrenceCode || user?.refrenceCode || "No code"}
              </ModalData>
            ) : user?.refrenceCode ? (
              <ModalData>
                Reference Code:{" "}
                {user?.data?.refrenceCode || user?.refrenceCode || "No code"}
              </ModalData>
            ) : (
              ""
            )}

            {user?.data?.byRefrence ? (
              <ModalData>
                By Reference:{" "}
                {user?.data?.byRefrence || user?.byRefrence || "No code"}
              </ModalData>
            ) : user?.byRefrence ? (
              <ModalData>
                By Reference:{" "}
                {user?.data?.byRefrence || user?.byRefrence || "No code"}
              </ModalData>
            ) : (
              ""
            )}

            {user?.data?.refrenceCode ? (
              <ModalData>
                Reference Users:{" "}
                {user?.data?.refrenceUsers?.length ||
                  user?.refrenceUsers?.length ||
                  0}
              </ModalData>
            ) : user?.refrenceCode ? (
              <ModalData>
                Reference Users:{" "}
                {user?.data?.refrenceUsers?.length ||
                  user?.refrenceUsers?.length ||
                  0}
              </ModalData>
            ) : (
              ""
            )}

            {user?.data?.refrenceCode ? (
              <ModalData>
                Bouns: {user?.data?.bouns || user?.bouns || 0}
              </ModalData>
            ) : user?.refrenceCode ? (
              <ModalData>
                Bouns: {user?.data?.bouns || user?.bouns || 0}
              </ModalData>
            ) : (
              ""
            )}

            <WinDraw
              onClick={() => {
                winDrawHandle();
              }}
            >
              Win Draw
            </WinDraw>
            <LogoutButton
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </LogoutButton>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
}

export default Navbar;
