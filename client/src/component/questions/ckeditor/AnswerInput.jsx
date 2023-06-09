import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { Button } from "antd";
import "./answerInput.css";

const AnswerInput = ({ content, onContentChange, onCancel, onSubmit }) => {
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
    <div>
      <ReactQuill
        modules={{ toolbar: toolbarOptions }}
        className="quill-editor"
        value={content}
        onChange={onContentChange}
      />
      <div className="button-group">
        <Button
          type="primary"
          danger
          onClick={onCancel}
          style={{ marginRight: "10px" }}
        >
          Hủy bỏ
        </Button>
        <Button type="primary" onClick={onSubmit}>
          Gửi Câu trả lời
        </Button>
      </div>
    </div>
  );
};

export default AnswerInput;
