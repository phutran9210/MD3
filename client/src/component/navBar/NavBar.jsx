import { Divider, Layout, Space } from "antd";
import SiderIn from "./navBarItems/Sider";
import MenuNav from "./navBarItems/MenuNav";
import FooterComponent from "../footer/FooterComponent";
import ContentComponent from "../content/ContentComponent";
const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 45,
  // position: "sticky",
  // top: 0,
  lineHeight: "64px",
  backgroundColor: "#ffffff",
  width: "86%",
  margin: "0 auto",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#f0f0f0",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#ffffff",
  width: "25%",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#ffffff",
};

const layoutStyle = {
  marginLeft: "5%",
  width: "70%",
};
const NavBar = () => (
  <div>
    <Header style={headerStyle}>
      <MenuNav />
    </Header>
    <Divider />
    <Layout>
      <Sider style={siderStyle}>
        <SiderIn />
      </Sider>
      <Layout style={layoutStyle}>
        <Content style={contentStyle}>
          <ContentComponent />
        </Content>
        <Sider>COntenSider</Sider>
      </Layout>
    </Layout>
    <Footer style={footerStyle}>
      <FooterComponent />
    </Footer>
  </div>
);
export default NavBar;
