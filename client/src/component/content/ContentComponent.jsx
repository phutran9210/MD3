import { Avatar, Button, List, Skeleton, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/posts";
import { postState } from "../../redux/selector/selector";
import "./contentComponent.css";
const count = 15;

const ContentComponent = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  const dataPosts = useSelector(postState);
  // console.log(dataPosts);
  useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest());
  }, [dispatch]);
  useEffect(() => {
    if (dataPosts) {
      setInitLoading(false);
      setData(
        dataPosts.map((item) => ({
          ...item,
          tag_name: item.tag_name ? item.tag_name.split(",") : [],
        }))
      );
      setList(
        dataPosts.slice(0, count).map((item) => ({
          ...item,
          tag_name: item.tag_name ? item.tag_name.split(",") : [],
        }))
      );
    }
  }, [dataPosts]);

  const onLoadMore = () => {
    setLoading(true);
    const newData = data.slice(list.length, list.length + count);
    const newList = list.concat(
      newData.map((item) => ({
        ...item,
        tag_name: item.tag_name ? item.tag_name.split(",") : [],
      }))
    );
    setList(newList);
    setLoading(false);
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  function getTagColor(tag) {
    switch (tag) {
      case "JavaScript":
        return "#1677ff";
      case "JavaCore":
        return "#389e0d";
      case "C":
        return "#722ed1";
      case "NodeJs":
        return "#2db7f5";
      case "ExpressJs":
        return "#87d068";
      case "Python":
        return "#108ee9";
      default:
        return "gray";
    }
  }

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar />}
              title={<a href={`/posts/${item.question_id}`}>{item.title}</a>}
            />
            <div>
              {Array.isArray(item.tag_name) &&
                item.tag_name.map((tag) => (
                  <Tag key={tag} color={getTagColor(tag)}>
                    {tag}
                  </Tag>
                ))}
            </div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
export default ContentComponent;
