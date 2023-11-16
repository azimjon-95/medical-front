import React, { useState } from "react";
import "../styles/login.css";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/indexSlice";
// import { setUser } from "../redux/features/userSlice";
import wave from '../assets/img/wave.png'
import avatar from '../assets/img/avatar.svg'
import bg from '../assets/img/bg.svg'
import { FaUser } from 'react-icons/fa'
import { PiLockKeyFill } from 'react-icons/pi'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [eye, setEye] = useState(false)
  const [login, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const onfinishHandler = async () => {
    const values = {
      login,
      password
    }

    try {
      dispatch(showLoading())
      const res = await axios.post("/admin/login", values);
      dispatch(hideLoading())
      if (res.data.success) {
        // dispatch(setUser(res.data.innerData))
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("admin", res.data.exactAdmin.docORrecep);
        localStorage.setItem("category", res.data.exactAdmin.specialization);
        localStorage.setItem("doctorPhone", res.data.exactAdmin.phone);
        localStorage.setItem("doctorName", res.data.exactAdmin.lastName + " " + res.data.exactAdmin.firstName);
        message.success("Login Successfully");


        if (res.data.exactAdmin.docORrecep === "owner") {
          window.location = "/"
        } else if (res.data.exactAdmin.docORrecep === "Reception") {
          window.location = "/receptionHome"
        } else if (res.data.exactAdmin.docORrecep === "doctor") {
          window.location = "/appointments"
        }


        console.log(res.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className="Loginbodylog">
      <img className="wave" src={wave} />
      <div className="containerlog">
        <div className="imgLog">
          <img src={bg} />
        </div>
        <div className="login-content">
          <form
            className="FormLogin"
          >
            <img src={avatar} />
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="iconCont">
                <FaUser />
              </div>
              <div className="Inputdiv">
                <input value={login} onChange={(e) => setUsername(e.target.value)} type="text" className="input" placeholder="Username..." />
              </div>
            </div>
            <div className="input-div pass">
              <div className="iconCont">
                < PiLockKeyFill />
              </div>
              <div className="Inputdiv">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={eye ? "password" : "text"} className="input" placeholder="Password..." />
                <button onClick={() => setEye(!eye)}>
                  {eye ?
                    <AiFillEyeInvisible />
                    :
                    <AiFillEye />
                  }
                </button>
              </div>
            </div>
            <a href="#">Forgot Password?</a>
            <input onClick={() => onfinishHandler()} type="submit" className="btnIN" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


{/* <div className="form-container ">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Login From</h3>

        <Form.Item label="login" name="login">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/add-doctor" className="m-2">
          Not a user Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div> */}