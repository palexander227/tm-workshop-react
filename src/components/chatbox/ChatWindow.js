import React from "react";
import "./ChatWindow.css";
import { UserOutlined } from "@ant-design/icons";
import { Form, Button, Input, Avatar } from "antd";
import { SendOutlined, TagsOutlined, CloseOutlined } from "@ant-design/icons";

const ChatWindow = ({ handleClose, item }) => {
  return (
    <div className="chat-window">
      <div className="close-messenger" onClick={() => handleClose(item.id)}>
        <CloseOutlined />
      </div>
      <div className="caht-haeding">
        <Avatar size={45} icon={<UserOutlined />} />
        <div className="content">
          <p className="name">{item.name}</p>
          <small className="status">online</small>
        </div>
      </div>
      <div className="chat-box">
        <div>
          <div className="taecher">Hello how are you doing?</div>
          <div className="student-bx">
            <div className="student">I am doing great! Thanks.?</div>
          </div>
          <div className="taecher">Hello how are you doing?</div>
        </div>

        <Form
          preserve={false}
          className="msg-input"
          name="normal_modal"
          autoFocus={true}
        >
          <Form.Item name="message">
            <Input placeholder="Tpye here.." />
          </Form.Item>

          <Form.Item className="sendBtn">
            <Button
              size="small"
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
            />
          </Form.Item>
          <div className="attachFile">
            <TagsOutlined />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChatWindow;
