import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {UserAuth} from '../context/AuthContext.js';
const Login = () => {
  const {googleSignIn,user} = UserAuth();
 
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try{
      await googleSignIn();
    } catch(error) {
      console.log(error);
    }
  };
  useEffect(()=> {
     if (user!=null){
      navigate('/landing');
     }
  },[user]);

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
};

export default Login;
