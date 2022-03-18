import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {} from "react-router";
import "./Login.css";
import { Colors } from "../../constants/constants";
import { AiOutlineCheck } from "react-icons/ai";

function Login() {
  const [check, setCheck] = useState(false);

  function checkHandler() {
    setCheck(!check);
  }

  const navigate = useNavigate();
  return (
    <div
      className="login_page_container"
      style={{
        backgroundColor: Colors.bg,
      }}
    >
      <img
        src="https://www.universitymagazine.ca/wp-content/uploads/2021/08/How-to-Get-Netflix-For-Free.jpg"
        className="image"
      />
      <img
        src={require("../../assets/MOVEEZ.png")}
        style={{
          position: "absolute",
          top: -10,
          left: -10,
        }}
      />
      <div className="login_container">
        <a
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            marginBottom: 20,
            marginTop: 20,
          }}
          onClick={() => {
            navigate("/home");
          }}
          className="login_text"
        >
          Login
        </a>
        <input className="email_input" placeholder="Email or phone number" />
        <input className="email_input" placeholder="Password" />
        <a style={{ color: "white", marginTop: 10 }}>Forgot password?</a>
        <button
          className="login_button"
          onClick={() => {
            navigate("/home");
          }}
        >
          <a
            style={{
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Login
          </a>
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          <div
            onClick={checkHandler}
            className="checkbox"
            style={
              check
                ? {
                    backgroundColor: Colors.primary,
                    borderColor: Colors.primary,
                  }
                : {
                    borderColor: "grey",
                  }
            }
          >
            {check ? <AiOutlineCheck color={"white"} /> : null}
          </div>
          <a>Remember me</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
