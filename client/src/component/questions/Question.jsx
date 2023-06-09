import React, { useEffect, useState } from "react";
import {
  Typography,
  Descriptions,
  Divider,
  Tag,
  Button,
  Space,
  Avatar,
  message,
} from "antd";
import {
  EditOutlined,
  ShareAltOutlined,
  StarOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";

import * as actions from "../../redux/actions/posts";

import {
  commentUser,
  onePost,
  formattedData,
} from "../../redux/selector/selector";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CommentList from "../answers/CommentList";
import AnswerInput from "./ckeditor/AnswerInput";
const { Title, Paragraph, Text } = Typography;

const Question = () => {
  const [content, setContent] = useState("");
  const [post, setPost] = useState(null);
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const dispatch = useDispatch();
  const postSaga = useSelector(onePost);
  const comments = useSelector(commentUser);
  const data = useSelector(formattedData);

  const { question_id } = useParams();

  useEffect(() => {
    dispatch(actions.get1Post.get1PostRequest(question_id));
    dispatch(actions.getBodyQuestion.getBodyQuestionRequest(question_id));

    if (comments && comments.answerId && comments.latestComment) {
      const { answerId, latestComment } = comments;
      const userID = JSON.parse(localStorage.getItem("loggedUser"));
      if (userID) {
        const cmtPayload = {
          latestComment: latestComment,
          userID: userID,
        };
        dispatch(
          actions.sendComment.getSendCommentRequest(
            question_id,
            answerId,
            cmtPayload
          )
        );
      } else {
        message.warning("Vui lòng đăng nhập lại để thực hiện hành động");
      }
    }
  }, [comments, dispatch, question_id]);
  console.log("dataaaaa", data);
  useEffect(() => {
    if (postSaga) {
      setPost(postSaga);
      setIsPostLoaded(true);
    }
  }, [postSaga]);

  if (!isPostLoaded) {
    return <div>Loading...</div>;
  }

  post.answers = data;
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleCancel = () => {
    setContent("");
  };

  const handleSubmit = () => {
    const userID = JSON.parse(localStorage.getItem("loggedUser"));
    if (userID) {
      const newAnswer = {
        userID: userID,
        content: content,
        question_id: question_id,
      };
      setContent("");
      dispatch(actions.sendAnswer.getSendAnswerRequest(question_id, newAnswer));
    } else {
      message.warning("Vui lòng đăng nhập lại để thực hiện hành động");
    }
  };
  return (
    <>
      <div>
        <Title level={3}>{post.title}</Title>
        <Divider />
        <Descriptions>
          <Descriptions.Item label="Lượt xem">
            {post.view_count}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tải lên">
            {post.create_at}
          </Descriptions.Item>
        </Descriptions>
        <Divider />

        <Space size={[0, 8]} wrap>
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="gold">gold</Tag>
        </Space>

        <Divider />

        <Space>
          <Button type="primary" icon={<ShareAltOutlined />}>
            Share
          </Button>
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button type="primary" icon={<StarOutlined />}>
            Follow
          </Button>
        </Space>

        <Avatar size="large" icon={<AntDesignOutlined />} />
        <Divider />
        <CommentList answers={post?.answers} />
        <AnswerInput
          content={content}
          onContentChange={handleContentChange}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Question;
