import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/urls.jsx";
import "./navbar.css";

import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

function Navbar({ refUsersTotal, setRefUsersTotal }) {
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [categories1, setCategories1] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [categories3, setCategories3] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log(showModal);
  }, [showModal]);

  const handleDropdownToggle = () => {
    setDropdown((prev) => !prev);
  };
  const handleDropdownToggle2 = () => {
    setDropdown2((prev) => !prev);
  };

  useEffect(() => {
    console.log(refUsersTotal);
  }, [refUsersTotal]);

  useEffect(() => {
    // fetch all categories
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        console.log(res.data);
        setCategories1(res.data.slice(0, 6));
        setCategories2(res.data.slice(6, 12));
        setCategories3(res.data.slice(12, 18));
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };
  const winDrawHandle = () => {
    // console.log("hi");
    try {
      api
        .post("/windraw", {
          userDetails: user?.data,
          amount: user?.data?.bonus,
        })
        .then((res) => {
          console.log(res.data);
          alert("your request has been submited!");
          setShowModal(false);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };

  return (
    <>
      <nav
        class="navbar sticky-top navbarContainer"
        style={{ backgroundColor: "#fff" }}
      >
        <div class="container-fluid p-0">
          <Link to="/">
            <a class="navbar-brand">
              <img
                className="ms-4"
                src="data:image/jpeg;base64,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"
                width="100px"
                alt=""
              />
            </a>
          </Link>
          <ul class="nav-ul justify-content-center d-flex   flex-grow-1 pe-3">
            <li
              class="ms-5 "
              style={{ listStyle: "none", fontSize: "20px", fontWeight: "600" }}
            >
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>

            <li
              class="ms-5 nav-item dropdown position-static"
              style={{ listStyle: "none", fontSize: "20px", fontWeight: "600" }}
            >
              <a
                data-mdb-dropdown-init
                class="nav-link "
                id="navbarDropdown"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                onClick={handleDropdownToggle}
              >
                Menu{" "}
                {dropdown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </a>

              <div
                className={`dropdown-menu w-100 mt-0 ${dropdown ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
                style={{
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  left: 0,
                  top: "90%",
                }}
              >
                <div className="container">
                  <div className="row my-4">
                    <div className="col-md-6  col-xl-4">
                      <div className="list-group d-flex justify-content-between list-group-flush">
                        {categories1?.map((category) => (
                          <Link
                            to={`/products/${category?.name}`}
                            className="list-group-item list-group-item-action p-4"
                          >
                            <img
                              src={category?.img}
                              style={{
                                width: "50px",
                                border: "1px solid #e6e6e6",
                              }}
                              alt=""
                            />
                            &nbsp; {category?.name}
                          </Link>
                        ))}
                      </div>
                    </div>{" "}
                    <div className="col-md-6 col-xl-4">
                      <div className="list-group list-group-flush">
                        {categories2?.map((category) => (
                          <Link
                            to={`/products/${category?.name}`}
                            className="list-group-item list-group-item-action p-4"
                          >
                            <img
                              src={category?.img}
                              style={{
                                width: "50px",
                                border: "1px solid #e6e6e6",
                              }}
                              alt=""
                            />
                            &nbsp; {category?.name}
                          </Link>
                        ))}
                      </div>
                    </div>{" "}
                    <div className="col-md-6 col-xl-4">
                      <div className="list-group list-group-flush">
                        {categories3?.map((category) => (
                          <Link
                            to={`/products/${category?.name}`}
                            className="list-group-item list-group-item-action p-4"
                          >
                            <img
                              src={category?.img}
                              style={{
                                width: "50px",
                                border: "1px solid #e6e6e6",
                              }}
                              alt=""
                            />
                            &nbsp; {category?.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="navIconsContainer">
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
                {/* <UserName>
                  {(user && user?.data?.username) || user?.username}
                </UserName> */}
              </>
            )}
            {!user && (
              <>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  REGISTER&nbsp;
                </Link>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  SIGN IN
                </Link>
              </>
            )}
            {/* <PersonOutlineOutlinedIcon style={{ fontSize: "35px" }} /> */}
            &nbsp; &nbsp; &nbsp;
            <Link to="/cart">
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCartOutlinedIcon
                  color="action"
                  style={{ fontSize: "35px", color: "black" }}
                />
              </Badge>
            </Link>
            &nbsp; &nbsp; &nbsp; &nbsp;
          </div>

          <button
            className="hamburger"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <MenuIcon style={{ border: "none !important", fontSize: "55px" }} />
          </button>

          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                <img
                  src="https://foodic-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1658832482"
                  width="100px"
                  alt=""
                />
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>

                <li class="nav-item dropdown position-static">
                  <a
                    data-mdb-dropdown-init
                    class="nav-link "
                    id="navbarDropdown"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                    onClick={handleDropdownToggle2}
                  >
                    Menu{" "}
                    {dropdown2 ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </a>

                  <div
                    className="container"
                    style={{ display: dropdown2 ? "block" : "none" }}
                  >
                    <div className="row my-4">
                      <div className="col-md-6  col-xl-4">
                        <div className="list-group d-flex justify-content-between list-group-flush">
                          {categories1?.map((category) => (
                            <Link
                              to={`/products/${category?.name}`}
                              className="list-group-item list-group-item-action p-4"
                            >
                              <img
                                src={category?.img}
                                style={{
                                  width: "50px",

                                  border: "1px solid #e6e6e6",
                                }}
                                alt=""
                              />
                              &nbsp; {category?.name}
                            </Link>
                          ))}
                        </div>
                      </div>{" "}
                      <div className="col-md-6 col-xl-4">
                        <div className="list-group list-group-flush">
                          {categories2?.map((category) => (
                            <Link
                              to={`/products/${category?.name}`}
                              className="list-group-item list-group-item-action p-4"
                            >
                              <img
                                src={category?.img}
                                style={{
                                  width: "50px",
                                  border: "1px solid #e6e6e6",
                                }}
                                alt=""
                              />
                              &nbsp; {category?.name}
                            </Link>
                          ))}
                        </div>
                      </div>{" "}
                      <div className="col-md-6 col-xl-4">
                        <div className="list-group list-group-flush">
                          {categories3?.map((category) => (
                            <Link
                              to={`/products/${category?.name}`}
                              className="list-group-item list-group-item-action p-4"
                            >
                              <img
                                src={category?.img}
                                style={{
                                  width: "50px",
                                  border: "1px solid #e6e6e6",
                                }}
                                alt=""
                              />
                              &nbsp; {category?.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <br />

              <div style={{ display: "flex", marginTop: "-15px" }}>
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
                    {/* <UserName>
                  {(user && user?.data?.username) || user?.username}
                </UserName> */}
                  </>
                )}
                {!user && (
                  <>
                    <Link
                      to="/register"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      REGISTER&nbsp;
                    </Link>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      SIGN IN
                    </Link>
                  </>
                )}
                &nbsp;
                <Link to="/cart">
                  <Badge badgeContent={quantity} color="secondary">
                    <ShoppingCartOutlinedIcon
                      color="action"
                      style={{ fontSize: "35px", color: "black" }}
                    />
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showModal && (
        <Modal
          onClick={handleModalClick}
          open={showModal}
          close={handleClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none !important",
          }}
        >
          <ModalContainer>
            <ModalImg
              src={
                user?.data?.img ||
                user?.img ||
                "https://i.ibb.co/MBtjqGJ/avatar.png"
              }
            />
            <ModalTitle>
              {(user && user?.data?.username) || user?.username}
            </ModalTitle>
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
              <ModalData>Bouns: {user?.data?.bonus}</ModalData>
            ) : user?.refrenceCode ? (
              <ModalData>Bouns: {user?.bonus}</ModalData>
            ) : (
              ""
            )}

            {user?.data?.winDrawReq ? (
              <p>Your Windraw request is under process.</p>
            ) : (
              <>
                <WinDraw
                  style={{
                    cursor: user?.data?.winDrawReq ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    winDrawHandle();
                  }}
                >
                  Win Draw
                </WinDraw>
              </>
            )}
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
