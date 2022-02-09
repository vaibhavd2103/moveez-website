import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {} from "react-router";

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <h1
        onClick={() => {
          navigate("/home");
        }}
      >
        {/* <Link to="/home">Login Screen</Link> */}
        Login Screen
      </h1>
    </div>
  );
}

export default Login;
