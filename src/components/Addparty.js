import React from "react";



import { Button, Row, Col} from "react-bootstrap";
import {UserAuth} from '../context/AuthContext.js';
import { projDB } from "../firebase/config.js";
import {
  doc,
  collection,
  query,
  getDocs,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { timestamp } from "../firebase/config";
import { Navigate } from "react-router-dom";


export default function Addparty({ partyCode}) {
  const { user, logout } = UserAuth();

  const leaveParty = async(e) => {
    const q = query(collection(projDB, "parties"));
    const querySnapshot = await getDocs(q);
    let foundParty=null;
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data().currentSong);
      if (doc.data().partyCode === partyCode) {
        
        console.log("IS PRESENT");
        foundParty = doc;
      }
    });
    var newarr = [];
    if (foundParty.data().members.includes(user.displayName)) {
        for (let el in foundParty.data().members){
          if (foundParty.data().members[el]!==user.displayName){
            newarr.push(foundParty.data().members[el]);
          }
        }
        const docNeededId = foundParty.id;
        const updatePartyRef = doc(projDB, "parties", docNeededId);
        let copyData = foundParty.data();
        copyData.members=newarr;
        copyData.numberActive = copyData.members.length;
        // console.log(foundParty.id);
        await setDoc(updatePartyRef, copyData);
    }
    window.location.href = "/landing";
  }
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
            onClick = {leaveParty}
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