import React, { useState } from "react";
import { Modal, Button, Input } from "antd";

const { TextArea } = Input;

const CommentModal = ({
  isCommentModalVisible,
  isReportModalVisible,
  handleOk,
  handleCancel,
  onSubmitComment,
}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    // Pass comment text to the parent component
    onSubmitComment(comment);
    setComment("");
    handleOk();
  };

  return (
    <>
      <Modal
        title="Bạn đang trả lời ... "
        open={isCommentModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
        />
      </Modal>

      <Modal
        title="Report"
        open={isReportModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Add form for report here */}
      </Modal>
    </>
  );
};

export default CommentModal;
