import { Avatar, Typography, Descriptions, Divider } from "antd";

const { Title, Text } = Typography;

const UserProfile = () => {
  return (
    <div>
      <Title level={2}>Hồ sơ cá nhân</Title>
      <Divider />

      <Avatar
        size={128}
        src="https://thuthuatnhanh.com/wp-content/uploads/2021/02/Anh-avatar-bua-cute-dep.jpg"
      />

      <Descriptions title="User Info" bordered>
        <Descriptions.Item label="Full Name">John Doe</Descriptions.Item>
        <Descriptions.Item label="Email">johndoe@example.com</Descriptions.Item>
        <Descriptions.Item label="Phone">1234567890</Descriptions.Item>
        <Descriptions.Item label="Address">
          123 Main Street, City, Country
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Title level={3}>Bio</Title>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et elit
        maximus, tincidunt lacus sed, commodo mauris. Phasellus aliquet urna at
        turpis tincidunt, sit amet commodo metus accumsan.
      </Text>
    </div>
  );
};

export default UserProfile;
