import React from "react";
import { Modal, Button, Select } from "antd";

const SetRoleModal = ({
  visible,
  selectedRole,
  onCancel,
  onOk,
  handleRoleChange,
}) => {
  return (
    <Modal
      title="Set Role"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={onOk}>
          OK
        </Button>,
      ]}
    >
      <Select
        value={selectedRole}
        style={{ width: "100%" }}
        onChange={handleRoleChange}
      >
        <Select.Option value="user">User</Select.Option>
        <Select.Option value="mod">Mod</Select.Option>
        <Select.Option value="admin">Admin</Select.Option>
      </Select>
    </Modal>
  );
};

export default SetRoleModal;
