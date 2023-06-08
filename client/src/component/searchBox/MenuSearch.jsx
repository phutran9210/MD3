import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value) => console.log(value);
const MenuSearch = () => (
  <Space direction="vertical">
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
  </Space>
);
export default MenuSearch;
