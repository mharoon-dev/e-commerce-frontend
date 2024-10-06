import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../admin/src/utils/urls";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethod.js";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;

  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const [phone, setPhone] = useState();
  const [byRefrence, setByRefrence] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (username && email && password && phone) {
      const data = {
        username,
        email,
        password,
        byRefrence: byRefrence ? byRefrence : null,
        phoneNumber: phone,
      };
      console.log(data);
      userRequest
        .post("/auth/register", data)
        .then((res) => {
          console.log(res.data);
          alert("User has been created");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
        });
    } else {
      alert("Please fill all the fields 📝");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
      byRefrence,
      refrenceCode: "No Refrence Code",
      phoneNumber: +phone,
      // img: downloadURL,
    };
    console.log(user);
    userRequest
      .post("/auth/register", user)
      .then((res) => {
        console.log(res);
        alert("User has been created");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });

    // const fileName = new Date().getTime() + file.name;
    // const storage = getStorage(app);
    // const storageRef = ref(storage, fileName);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case "paused":
    //         console.log("Upload is paused");
    //         break;
    //       case "running":
    //         console.log("Upload is running");
    //         break;
    //       default:
    //     }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

    //     });
    //   }
    // );
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleClick}>
          <Input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="tel"
            placeholder="03214567892 (easypaise , jazz cash)"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Refrence code (optional)"
            onChange={(e) => setByRefrence(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
