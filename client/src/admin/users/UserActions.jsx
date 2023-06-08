import React, { useState } from "react";
import { Dropdown, Menu, Modal, Form, Input, Button, Select } from "antd";
import { useDispatch } from "react-redux";

import * as actions from "../../redux/actions/users";
import api from "../../api/jwtAccessToken";

import SetRoleModal from "./modal/SetRoleModal";
import EditUserModal from "./modal/EditUserModal";

const UserActions = ({ record, onBan, onUnban, onEditUser, onSetRole }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState(record.gender);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [setRoleModalVisible, setSetRoleModalVisible] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "ban":
        onBan(record.user_id);
        break;
      case "unban":
        onUnban(record.user_id);
        break;
      case "editUser":
        showEditModal();
        break;
      case "setRole":
        showSetRoleModal();
        break;
      default:
        break;
    }
  };

  const handleEditUserSave = () => {
    form.validateFields().then((values) => {
      const editedValues = { ...values, gender: selectedGender };
      onEditUser(record.user_id, editedValues);
      setEditModalVisible(false);
    });
  };

  const handleEditUserCancel = () => {
    setEditModalVisible(false);
  };

  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const showSetRoleModal = () => {
    setSelectedUserId(record.user_id);
    setSetRoleModalVisible(true);
  };

  const handleSetRoleOk = (userId) => {
    onSetRole(selectedUserId);
    console.log("role id", selectedUserId);
    dispatch(actions.setRoleUser.setRoleUserRequest({ userId, selectedRole }));

    // hoặc thực hiện các thay đổi cần thiết
    // Sau khi xử lý xong, đóng modal
    setSetRoleModalVisible(false);
  };
  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const handleRoleChange = (value) => {
    console.log("đây là role", value);
    setSelectedRole(value);
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="ban">Ban</Menu.Item>
      {(record.banned === 1 || record.banned === 2) && (
        <Menu.Item key="unban">Unban</Menu.Item>
      )}
      <Menu.Item key="editUser">Edit User</Menu.Item>
      <Menu.Item key="setRole">Set Role</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Action
        </a>
      </Dropdown>

      <EditUserModal
        visible={editModalVisible}
        record={record}
        selectedGender={selectedGender}
        form={form}
        onCancel={handleEditUserCancel}
        onOk={handleEditUserSave}
        handleGenderChange={handleGenderChange}
      />
      <SetRoleModal
        selectedUserId={selectedUserId}
        visible={setRoleModalVisible}
        selectedRole={selectedRole}
        onCancel={() => setSetRoleModalVisible(false)}
        onOk={() => handleSetRoleOk(selectedUserId)}
        handleRoleChange={handleRoleChange}
      />
    </>
  );
};

export default UserActions;
