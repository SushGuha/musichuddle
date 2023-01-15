import React from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { projDB } from "../firebase/config.js";
import { collection, query, getDocs, addDoc } from "firebase/firestore";
import { timestamp } from "../firebase/config";

const codeGen = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const Landing = () => {
  const { user, logout } = UserAuth();
  const [entered, setEntered] = useState("");
  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const createParty = async (e) => {
    e.preventDefault();
    // Starts a listening session.

    // Generate random code and check if code is already present in the database
    let partyCode = codeGen(6);
    let isPresent = false;
    do {
      if (isPresent) {
        isPresent = false;
        partyCode = codeGen(6);
      }
      // Checks if the code is already in the db
      const q = query(collection(projDB, "parties"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().currentSong);
        if (doc.data().partyCode === partyCode) {
          isPresent = true;
          console.log("IS PRESENT");
        }
      });
    } while (isPresent);

    // adds a party to the firestore database
    const partyInfo = {
      partyCode: partyCode,
      partyTime: timestamp.now(),
      hostUsername: user.displayName,
      members: [user.displayName],
      songs: [],
      currentSong: "",
      numberActive: 1,
    };

    const docRef = await addDoc(collection(projDB, "parties"), partyInfo);
    const q = query(collection(projDB, "users"));
      const querySnapshot = await getDocs(q);
      let userPresent=false;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().currentSong);
        if (doc.data().Name === user.displayName) {
          userPresent = true;
          console.log("IS PRESENT");
        }
      });
      if(!userPresent){
        const docRef = await addDoc(collection(projDB, "users"), user.displayName);
        
      }
    
    window.location.href="/party/"+partyCode;
    // Navigate to the party dashboard page
    // The call firebase to get the party info from that page.
  };

  const getParty = async(e) => {
    let partyCode = "123456";
    let userName = "tarun";
    let isPresent = false;
    const q = query(collection(projDB, "parties"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().currentSong);
        if (doc.data().partyCode === partyCode) {
          isPresent = true;
          console.log("IS PRESENT");
        }
      });
    if(isPresent){
      //check if username is in the party if so add oatherwise do not add
      const q = query(collection(projDB, "users"));
      const querySnapshot = await getDocs(q);
      let userPresent=false;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().currentSong);
        if (doc.data().Name === userName) {
          userPresent = true;
          console.log("IS PRESENT");
        }
      });
      if(!userPresent){
        const docRef = await addDoc(collection(projDB, "users"), userName);
        
      }
    }
    else{
      let errorFinding = "Party Not Found!";
      console.log(errorFinding);
      alert(errorFinding);
    }

  }

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
        <button onClick={handleSignOut} className="border py-2 px-5 mt-10">
          Logout from Google
        </button>
      </Row>
      <br></br>
      <Row>
        <Button variant="success" onClick={createParty}>
          Start a Listening Session
        </Button>{" "}
      </Row>
      <br></br>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Party Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Party Code"
              onChange={(e) => {
                setEntered(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Join the Session!
          </Button>
        </Form>
      </Row>
      <br></br>
    </Container>
  );
};

export default Landing;
