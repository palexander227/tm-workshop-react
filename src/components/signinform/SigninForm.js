import React from "react";
import "./SigninForm.css";
import { Checkbox, Form, Button, Input, Row, Col } from "antd";
import LockIcon from "../../components/Icon/LockIcon";
import UserIcon from "../../components/Icon/UserIcon";
import { Link } from "react-router-dom";

const SigninForm = () => {
  return (
    <Row className="signin-container">
      <Col xs={22} sm={22} md={13} lg={10} xl={8} className="signin-form">
        <h1>LOGIN</h1>
        <Form
          name="normal_login"
          autoFocus={true}

          // onFinish={handleSignin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "User name is required!" }]}
          >
            <Input prefix={<UserIcon />} placeholder="User Name" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required!" }]}
          >
            <Input.Password
              prefix={<LockIcon />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Row className="forgot-pass">
            <Checkbox>Remember me</Checkbox>
            <Link to={""}>Forgot Password?</Link>
          </Row>

          <Form.Item className="submitItem">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="login-form-button"
            >
              Login
            </Button>
          </Form.Item>

          <div className="line">
            <p></p>
            <p></p>
          </div>

          <div className="login-footer">
            <p>Not a member?</p>
            <p>
              <Link to={"/signup"}>Create Account</Link>
            </p>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SigninForm;
