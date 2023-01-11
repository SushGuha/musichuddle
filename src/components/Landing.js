import React from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { UserAuth } from '../context/AuthContext';
const Landing = () => {
  const {user, logout} = UserAuth();
  const [entered, setEntered] = useState("");
  const handleSignOut = async () => {
    try{
        await logout();
    }
    catch (error){
    console.log(error);
}}
  return (
    
    <Container
      className="container-containerState  hover"
      style={{ height: "100vh " }}
    >
      <Row>
       <p>Welcome ,{user?.displayName}</p>
      </Row>
      <br></br>
      <Row>
       <button onClick = {handleSignOut} className = 'border py-2 px-5 mt-10'>Logout from Google</button>
      </Row>
      <br></br>
      <Row>
        <Button  variant="success">
          Start a Listening Session
        </Button>{" "}
      </Row>
      <br></br>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Party Code"
              onChange={(e) => {
                setEntered(e.target.value);
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            
            type="submit"
          >
            Join the Session!
          </Button>
        </Form>
      </Row>
      <br></br>
    </Container>
  );
};

export default Landing;