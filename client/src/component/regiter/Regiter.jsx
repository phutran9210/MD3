import { Button, Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as actions from "../../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";

import ReCAPTCHA from "react-google-recaptcha";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Regiter = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const regex = /^[a-zA-Z0-9._-]{3,16}$/;
  const dispatch = useDispatch();

  function validateUsername(rule, value, callback) {
    if (!value) {
      callback("Vui lòng nhập Tên đăng nhập");
    } else if (!regex.test(value)) {
      callback("Tên đăng nhập không hợp lệ");
    } else {
      callback();
    }
  }

  const onFinish = (values) => {
    dispatch(actions.createUser.createUserRequest(values));

    // console.log(values);
    // axios
    //   .post("http://localhost:6688/api/v1/users/register", values)
    //   .then((response) => {
    //     console.log("Success :", response.data);
    //     message.success("Đăng kí thành công");
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data);
    //     if (error.response.data === "Username is already taken") {
    //       message.error("Tên đăng nhập đã được sử dụng");
    //     } else if (error.response.data === "Email is already taken") {
    //       message.error("Email đã được sử dụng");
    //     }
    //   });
  };

  const onCaptchaChange = (value) => {
    // bạn có thể xử lý giá trị reCAPTCHA tại đây
    console.log("Captcha value:", value);
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="userName"
          label="Tên đăng nhập"
          rules={[
            {
              validator: validateUsername,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              message: "Please input your adress",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          tooltip="What do you want others to call you?"
          rules={[
            {
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              message: "Please select gender!",
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        {/* <Form.Item
          name="captcha"
          noStyle
          rules={[
            {
              required: true,
              message: "Please input the captcha you got!",
            },
          ]}
        >
          <ReCAPTCHA
            sitekey="6LeDTlQmAAAAAKZYxvg_RsCv6EWAaDGvTrmkZ6h1"
            onChange={onCaptchaChange}
          />
        </Form.Item> */}

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Regiter;
