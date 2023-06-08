// import React from "react";
// import { AudioOutlined } from "@ant-design/icons";
// import { Input } from "antd";
// import { useDispatch } from "react-redux";
// import { searchText } from "../../redux/actions/search";
// import * as actions from "../../redux/actions/search";
// const { Search } = Input;
// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: "#1890ff",
//     }}
//   />
// );
// const UserSearch = () => {
//   const dispatch = useDispatch();
//   const handleSearch = (value) => {
//     // console.log("text", value);
//     dispatch(actions.searchText.searchTextRequest(value));
//   };
//   return (
//     <Search
//       style={{
//         display: "flex",
//         justifyContent: "flex-start",
//         marginTop: 16,
//         marginBottom: 16,
//       }}
//       placeholder="Nhập tên người dùng tại đây"
//       enterButton="Search"
//       size="large"
//       suffix={suffix}
//       onSearch={handleSearch}
//     />
//   );
// };

// export default UserSearch;

import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, AutoComplete } from "antd";
import { useDispatch } from "react-redux";
import { searchText } from "../../redux/actions/search";
import * as actions from "../../redux/actions/search";

const UserSearch = () => {
  const dispatch = useDispatch();

  const handleSearch = (value) => {
    console.log("search", value);
    dispatch(actions.searchText.searchTextRequest(value));
  };

  return (
    <AutoComplete
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginTop: 16,
        marginBottom: 16,
      }}
      placeholder="Nhập tên người dùng tại đây"
      size="large"
      onSearch={handleSearch}
    ></AutoComplete>
  );
};

export default UserSearch;
