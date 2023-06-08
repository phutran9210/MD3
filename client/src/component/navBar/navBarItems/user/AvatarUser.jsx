import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
const AvatarUser = () => (
  <Space size={28}>
    <Badge count={1}>
      <Avatar shape="square" icon={<UserOutlined />} />
    </Badge>
  </Space>
);
export default AvatarUser;
