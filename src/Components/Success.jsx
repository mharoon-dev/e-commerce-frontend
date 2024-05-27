import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fcf5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 100px;
  border-radius: 5px;
  padding: 15px;
  background-color: #0e4445;
  color: white;
  cursor: pointer;
  border: none;
`;

function Success() {
  return (
    <>
      <Container>
          <Button>Successfull</Button>
          <p> Thank you for your purchasing</p>
        </Container>
    </>
  );
}

export default Success;
