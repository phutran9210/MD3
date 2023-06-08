import {
  ContainerOutlined,
  TrophyOutlined,
  QuestionCircleOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import logo from "../../../stackoverflow.png";
import MenuSearch from "../../searchBox/MenuSearch";
import AvatarUser from "./user/AvatarUser";
import { useNavigate } from "react-router-dom";

const MenuNav = () => {
  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={[
        {
          label: (
            <img
              src={logo}
              alt="Logo"
              style={{ width: "160px", marginRight: "8px" }}
            />
          ),
          key: "mail",
        },

        {
          label: "Product",
          key: "product",

          children: [
            {
              type: "group",
              label: "Item 1",
              children: [
                {
                  label: "Option 1",
                  key: "setting:1",
                },
                {
                  label: "Option 2",
                  key: "setting:2",
                },
              ],
            },
          ],
        },
        {
          label: <MenuSearch />,
          key: "searchMenu",
        },
        {
          label: <AvatarUser />,
          key: "avatarUser",
          children: [
            {
              label: "Đăng kí",
              onClick: handleRegisterClick,
            },
            {
              label: "Đăng nhập",
              onClick: handleLoginClick,
            },
          ],
        },
        {
          label: <ContainerOutlined style={{ fontSize: 30 }} />,
          key: "userInbox",
        },
        {
          label: <TrophyOutlined style={{ fontSize: 30 }} />,
          key: "achie",
        },
        {
          label: <QuestionCircleOutlined style={{ fontSize: 30 }} />,
          key: "helpBox",
        },
        {
          label: <ApiOutlined style={{ fontSize: 30 }} />,
          key: "community",
        },
      ]}
    />
  );
};
export default MenuNav;
