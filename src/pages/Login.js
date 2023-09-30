import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/indexSlice";
// import { setUser } from "../redux/features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/admin/login", values);
      dispatch(hideLoading())
      if (res.data.success) {
        // dispatch(setUser(res.data.innerData))
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("admin", res.data.exactAdmin.docORrecep);
        message.success("Login Successfully");
        navigate("/");

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
    <div className="form-container ">
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
    </div>
  );
};

export default Login;
