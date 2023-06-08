import React, { useEffect, useState } from "react";
import {
  Typography,
  Descriptions,
  Divider,
  Tag,
  Button,
  Space,
  Avatar,
} from "antd";
import {
  EditOutlined,
  ShareAltOutlined,
  StarOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";

import * as actions from "../../redux/actions/posts";

import { onePost } from "../../redux/selector/selector";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CommentList from "../answers/CommentList";
import TextEditor from "./ckeditor/Ckeditor";

const { Title, Paragraph, Text } = Typography;

const Question = () => {
  const [post, setPost] = useState(null);
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const dispatch = useDispatch();
  const postSaga = useSelector(onePost);

  const { question_id } = useParams();
  useEffect(() => {
    dispatch(actions.get1Post.get1PostRequest(question_id));
  }, [dispatch, question_id]);

  useEffect(() => {
    if (postSaga) {
      setPost(postSaga);
      setIsPostLoaded(true);
    }
  }, [postSaga]);
  console.log(post);

  if (!isPostLoaded) {
    return <div>Loading...</div>;
  }

  post.answers = [
    {
      title: "Answer 1",
      content: "This is the content of the first answer.",
      comments: [
        {
          author: "UserA",
          content: "This is a comment on the first answer by UserA.",
        },
        {
          author: "UserB",
          content: "This is another comment on the first answer by UserB.",
        },
      ],
    },
    {
      title: "Answer 2",
      content: "This is the content of the second answer.",
      comments: [
        {
          author: "UserC",
          content: "This is a comment on the second answer by UserC.",
        },
      ],
    },
  ];

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
        <TextEditor />
      </div>
    </>
  );
};

export default Question;
