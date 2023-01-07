import React from "react";
import { googleSignIn } from "../firebase/config";
const Login = () => {
  return (
    <div>
      <button onClick={googleSignIn}>Google Sign In</button>
    </div>
  );
};

export default Login;
