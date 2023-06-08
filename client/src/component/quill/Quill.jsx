import React, { useState } from "react";
import { Form, Input, Button } from "antd";

import api from "../../api/jwtAccessToken";
import { useSelector } from "react-redux";
import "./quill.css";

import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import CheckBoxTags from "./CheckBoxTags";
const Quill = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(null);
  const userID = JSON.parse(localStorage.getItem("loggedUser"));

  const handleSubmit = async (values) => {
    values.userID = userID;
    values.tags = tags;
    console.log(values);

    setLoading(true);
    try {
      await api.post("/posts", values);
      form.resetFields();
      setContent("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onChangeTags = (checkedValues) => {
    setTags(checkedValues);
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
    ["link", "image", "video"], // link and image, video
  ];
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ width: "80%" }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please input the content!" }]}
      >
        <ReactQuill
          modules={{ toolbar: toolbarOptions }}
          theme="snow"
          value={content}
          onChange={(value) => setContent(value)}
        />
      </Form.Item>
      <CheckBoxTags onChange={onChangeTags} />
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Quill;
