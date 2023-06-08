import {
  Table,
  Tag,
  Modal,
  Select,
  DatePicker,
  Button,
  Radio,
  message,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { usersState$ } from "../../redux/selector/selector";
import { finedUser } from "../../redux/selector/selector";
import * as actions from "../../redux/actions/users";

import "./userTable.css";
import UserActions from "./UserActions";
import api from "../../api/jwtAccessToken";

import UserSearch from "../../component/search/UserSearch";
const UsersTable = () => {
  const [data, setData] = useState([]);
  const [banModalVisible, setBanModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [setRoleModalVisible, setSetRoleModalVisible] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);
  const [banType, setBanType] = useState("temporary");
  const [banDays, setBanDays] = useState(1);
  const [updated, setUpdated] = useState(false);

  const dispatch = useDispatch();
  const usersAll = useSelector(usersState$);
  const user = useSelector(finedUser);
  const users = user ? user : usersAll;
  useEffect(() => {
    console.log("dispatch");
    dispatch(actions.getUsers.getUsersRequest());
  }, [dispatch]);

  useEffect(() => {
    setData([...users]);

    setUpdated(false);
  }, [users]);
  console.log("đây là users", users);
  // Màu trạng thái hoạt động
  function getTagColor(banned) {
    return banned ? "#f5222d" : "#52c41a";
  }

  function renderGenres(banned) {
    return (
      <Tag color={getTagColor(banned)}>{banned ? "Banned" : "Active"}</Tag>
    );
  }

  // Màu của role
  function getTagColorRole(roleName) {
    switch (roleName) {
      case "user":
        return "#1677ff";
      case "mod":
        return "#389e0d";
      case "admin":
        return "#722ed1";
      default:
        return "gray";
    }
  }

  function renderRole(roleName) {
    return <Tag color={getTagColorRole(roleName)}>{roleName}</Tag>;
  }

  //Màu Gender
  function getTagGender(genderUser) {
    switch (genderUser) {
      case "male":
        return "#001d66";
      case "female":
        return "#eb2f96";
      case "other":
        return "#a0d911";

      default:
        return "gray";
    }
  }
  function renderGender(genderUser) {
    return <Tag color={getTagGender(genderUser)}>{genderUser}</Tag>;
  }

  //Actions
  const handleBanDaysChange = (e) => {
    setBanDays(e.target.value);
  };
  const handleBan = (userId) => {
    setSelectedUserId(userId);
    setBanModalVisible(true);
  };

  const handleBanTypeChange = (value) => {
    setBanType(value);
  };

  const handleBanOk = () => {
    const requestData = {
      userId: selectedUserId,
      banType: banType,
      banDays: banDays,
    };

    api
      .post("/api/v1/users/ban", requestData)
      .then((response) => {
        // Xử lý phản hồi từ server sau khi chỉnh sửa thành công
        console.log(response.data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error(error);
      });
    console.log(requestData);

    // Đóng modal
    setBanModalVisible(false);
  };

  const handleUnban = (selectedUserId) => {
    api
      .post("/api/v1/users/unban", { selectedUserId })
      .then((response) => {
        message.success("Thành công");
        setUpdated(true);
      })
      .catch((error) => {
        message.error("Thất bại");
      });
  };

  const handleBanCancel = () => {
    // Hủy bỏ việc ban, đóng modal
    setBanModalVisible(false);
  };

  const handleEditUser = (userId, values) => {
    console.log(values);
    api
      .post(`/api/v1/users/${userId}`, values)
      .then((response) => {
        notification.success("Thành công");
        setUpdated(!updated);
      })
      .catch((error) => {
        message.error("Thất bại");
      });
  };

  const handleSetRole = (userId) => {
    setSelectedUserId(userId);
    setSetRoleModalVisible(true);
  };

  const handleUserClick = (userID) => {
    console.log(userID);
  };
  const columns = [
    {
      title: "Username",
      width: 100,
      dataIndex: "username",
      key: "username",
      fixed: "left",
      className: "title-username",
      render: (text, record) => (
        <span
          className="user-link"
          onClick={() => handleUserClick(record.user_id)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Role",
      width: 100,
      dataIndex: "role_name",
      key: "role_name",
      fixed: "left",
      render: renderRole,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "1",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "3",
      width: 150,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "4",
      width: 60,
      render: renderGender,
    },
    {
      title: "Status",
      render: (text, record) => renderGenres(record.banned),
      dataIndex: "banned",
      key: "5",
      width: 60,
    },
    {
      title: "Tên",
      dataIndex: "name_user",
      key: "6",
      width: 150,
    },
    {
      title: "Ngày tạo",
      dataIndex: "create_at",
      key: "7",
      width: 150,
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <UserActions
          record={record}
          onBan={handleBan}
          onUnban={handleUnban}
          onEditUser={handleEditUser}
          onSetRole={handleSetRole}
        />
      ),
    },
  ];

  return (
    <>
      <UserSearch />
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          y: 420,
        }}
        bordered
      />

      <Modal
        title="Ban User"
        open={banModalVisible}
        onOk={handleBanOk}
        onCancel={handleBanCancel}
      >
        <Select
          defaultValue={banType}
          onChange={handleBanTypeChange}
          style={{ width: "100%", marginBottom: "16px" }}
        >
          <Select.Option value="temporary">Temporary</Select.Option>
          <Select.Option value="permanent">Permanent</Select.Option>
        </Select>

        {banType === "temporary" && (
          <Radio.Group onChange={handleBanDaysChange} defaultValue={1}>
            <Radio value={1}>1 day</Radio>
            <Radio value={7}>7 days</Radio>
            <Radio value={30}>30 days</Radio>
            <Radio value={90}>90 days</Radio>
            <Radio value={180}>180 days</Radio>
            <Radio value={365}>365 days</Radio>

            {/* <DatePicker
              style={{ width: "100%" }}
              onChange={handleBanDateChange}
            /> */}
          </Radio.Group>
        )}
      </Modal>
    </>
  );
};
export default UsersTable;
