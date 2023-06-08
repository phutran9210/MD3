import React from "react";
import { Modal, Button } from "antd";

const CommentModal = ({
  isCommentModalVisible,
  isReportModalVisible,
  handleOk,
  handleCancel,
}) => {
  return (
    <>
      <Modal
        title="Add Comment"
        open={isCommentModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Add form for comment here */}
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
