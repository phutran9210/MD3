import { Layout, Row, Col } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "./footer.css";
import React from "react";
const FooterComponent = () => {
  return (
    <Layout.Footer style={{ backgroundColor: "#001529", color: "#fff" }}>
      <Row gutter={[16, 16]} justify="space-between">
        <Col xs={24} sm={24} md={8}>
          <h2>About Us</h2>
          <p>
            We are a company that provides high-quality services for customers.
          </p>
          <p>
            Our goal is to satisfy our customers and help them grow their
            business.
          </p>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <h2>Contact Us</h2>
          <p>
            <MailOutlined /> Email: info@company.com
          </p>
          <p>
            <PhoneOutlined /> Phone: +123456789
          </p>
          <p>
            <EnvironmentOutlined /> Address: 123 Main St, New York, NY 10001
          </p>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <h2>Follow Us</h2>
          <p>Stay up to date with our latest news and offers.</p>
          <div>
            <a href="https://www.facebook.com/">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        © 2023 Company Name. All rights reserved.
      </div>
    </Layout.Footer>
  );
};

export default FooterComponent;
