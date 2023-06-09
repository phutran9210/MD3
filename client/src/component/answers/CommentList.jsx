import { Avatar, List, Space, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import CommentModal from "./modal/CommentModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/actions/modal";
const optionStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
};
const CommentList = ({ answers }) => {
  const dispatch = useDispatch();
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const showCommentModal = (answerId) => {
    setSelectedAnswerId(answerId);
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
  const handleSubmitComment = (commentText) => {
    console.log("đây là cmtlisst", commentText);
    console.log("Selected answer_id:", selectedAnswerId);
    dispatch(
      addComment({
        commentText: commentText,
        answer_id: selectedAnswerId,
      })
    );
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
                  <a href="#">{answer.username}</a>
                  <Space>
                    <Button
                      type="text"
                      onClick={() => showCommentModal(answer.answer_id)}
                    >
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
              description={parse(answer.body)}
            />
          </List.Item>
          {/* Like and Reply Buttons */}

          {/* Render Modals */}
          <CommentModal
            isCommentModalVisible={isCommentModalVisible}
            isReportModalVisible={isReportModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
            onSubmitComment={handleSubmitComment}
          />

          {/* Render Comments */}
          <List
            itemLayout="horizontal"
            dataSource={answer.comments}
            renderItem={(comment, commentIndex) => (
              <List.Item
                style={{
                  marginLeft: "30px",
                  display:
                    !comment?.username || !comment?.body ? "none" : "block",
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${commentIndex}`}
                    />
                  }
                  title={<a href="#">{comment.username}</a>}
                  description={comment.body}
                />
              </List.Item>
            )}
            locale={{
              emptyText: <span></span>,
            }}
          />
        </div>
      )}
    />
  );
};
export default CommentList;
