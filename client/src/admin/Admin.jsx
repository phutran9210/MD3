import {
  FileOutlined,
  UserOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import UsersTable from "./users/UsersTable";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Users", "users"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Post", "sub2", <FileSearchOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("users");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuSelect = ({ key }) => {
    setSelectedKey(key);
  };

  const renderComponent = () => {
    switch (selectedKey) {
      case "users":
        return <UsersTable />;
      default:
        return <div>Placeholder</div>;
    }
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={handleMenuSelect}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Quản lý người dùng</Breadcrumb.Item>
            {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 160px)",
              background: colorBgContainer,
            }}
          >
            {renderComponent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
