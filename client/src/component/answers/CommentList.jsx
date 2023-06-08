import { Avatar, List, Space, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import CommentModal from "./modal/CommentModal";
import { useState } from "react";

const optionStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
};
const CommentList = ({ answers }) => {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const showCommentModal = () => {
    setIsCommentModalVisible(true);
  };

  const showReportModal = () => {
    setIsReportModalVisible(true);
  };

  const handleOk = () => {
    setIsCommentModalVisible(false);
    setIsReportModalVisible(false);
  };

  const handleCancel = () => {
    setIsCommentModalVisible(false);
    setIsReportModalVisible(false);
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={answers}
      renderItem={(answer, index) => (
        <div>
          {/* Render Answer */}
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={
                <div style={optionStyle}>
                  <a href="#">{answer.title}</a>
                  <Space>
                    <Button type="text" onClick={showCommentModal}>
                      Reply
                    </Button>
                    <Button
                      icon={<MoreOutlined />}
                      type="text"
                      onClick={showReportModal}
                    />
                  </Space>
                </div>
              }
              description={answer.content}
            />
          </List.Item>
          {/* Like and Reply Buttons */}

          {/* Render Modals */}
          <CommentModal
            isCommentModalVisible={isCommentModalVisible}
            isReportModalVisible={isReportModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />

          {/* Render Comments */}
          <List
            itemLayout="horizontal"
            dataSource={answer.comments}
            renderItem={(comment, commentIndex) => (
              <List.Item style={{ marginLeft: "30px" }}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${commentIndex}`}
                    />
                  }
                  title={<a href="#">{comment.author}</a>}
                  description={comment.content}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    />
  );
};
export default CommentList;
