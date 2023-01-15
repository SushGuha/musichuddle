import React from "react";



import { Button, Row, Col} from "react-bootstrap";
import {UserAuth} from '../context/AuthContext.js';


export default function Addparty({ partyCode}) {
  const { user, logout } = UserAuth();

  return (
    
    <div>
      
      
      <Row style={{ maxWidth: "100%" }}>
        
        
        <Col >
        </Col>
        <Col className="d-flex justify-content-left">
          {" "}
          <p>Party Code: {partyCode}</p>
        </Col>
        
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Button
            style={{ marginTop: "10px" }}
            
            variant="primary"
          >
            Logout
          </Button>{" "}
        </Col>
        <Row>
          <Col></Col>
        <Col>
         
          </Col>
          <Col ></Col>
          <Col className="d-flex justify-content-left">
          {" "}
          <p> Hello {user.displayName}</p></Col><Col></Col>
        </Row>
      </Row>
    
      <Row>
        <Col>Party Members
        <br>
        </br>
        
        </Col>
        <Col xs={8} md = {8} lg = {10}>SPace for search feature dashboard</Col>
        
      </Row>
        

    </div>
  );}