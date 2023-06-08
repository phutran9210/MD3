import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";

const EditUserModal = ({
  visible,
  record,
  selectedGender,
  form,
  onCancel,
  onOk,
  handleGenderChange,
}) => {
  const handleSave = () => {
    form.validateFields().then((values) => {
      onOk(values);
    });
  };

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={onCancel}
      onOk={handleSave}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          initialValue={record.username}
          rules={[{ required: true, message: "Please enter the username" }]}
        >
          <Input />
        </Form.Item>
        {/* Các Form.Item khác */}
      </Form>
    </Modal>
  );
};

export default EditUserModal;
