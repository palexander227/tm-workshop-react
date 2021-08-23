import React, { useState, useEffect } from "react";
import "./ChatWindow.css";
import { UserOutlined } from "@ant-design/icons";
import { Form, Button, Input, Avatar } from "antd";
import { SendOutlined, TagsOutlined, CloseOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import chatServ from "../../service/chatroom";
import { useSelector } from "react-redux";

const socket = io(`http://localhost:12000`);

const ChatWindow = ({ handleClose, item }) => {
  const { user } = useSelector((state) => state.userStore);
  const [msg, setMsg] = useState([]);
  const [form] = Form.useForm();
  const [media, setMedia] = useState([]);

  const fetchConvsersation = async () => {
    try {
      const res = await chatServ.getConverstion(item.id);
      setMsg(res.foundMessages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConvsersation();
  }, []);

  const handleSendMessage = async (value) => {
    // const form = new FormData();
    // form.append("message", value.message);
    // form.append("isMedia", true);
    // form.append("media", media);
    // form.append("recieverId", item?.id);

    const chatInfo = {
      message: value.message,
      isMedia: false,
      mediaUrl: "",
      recieverId: item?.id,
    };

    try {
      const res = await chatServ.SendOnlyMessage(chatInfo);
      socket.emit("newMessage", res.data);
      fetchConvsersation();
    } catch (err) {
      console.log(err);
    } finally {
      form.resetFields();
    }
  };

  // useEffect(() => {
  //   socket.on("newMessage", (newMessage) => {
  //     console.log(newMessage);
  //   });
  // });

  return (
    <div className="chat-window">
      <div className="caht-haeding">
        <Avatar size={45} icon={<UserOutlined />} />
        <div className="content">
          <p className="name">
            {item.firstName} {item.lastName}
          </p>
          <small className="status">{item.status ? 'Online' : 'Offline'}</small>
        </div>
        <div className="close-messenger" onClick={() => handleClose(item.id)}>
          <CloseOutlined />
        </div>
      </div>
      <div className="chat-box">
        <div>
          {msg.map((text) =>
            text.recieverId == item.id ? (
              <div className="ctudenttt">
                <div
                  key={text.id}
                  className="taecher"
                  style={{ marginBottom: "10px" }}
                >
                  {text.message}
                </div>
              </div>
            ) : (
              <div
                key={text.id}
                className="taecher"
                style={{ marginBottom: "10px" }}
              >
                {text.message}
              </div>
            )
          )}
        </div>

        <Form
          form={form}
          preserve={false}
          className="msg-input"
          name="normal_modal"
          autoFocus={true}
          onFinish={handleSendMessage}
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
          <div className="file-input-container">
            <input
              type="file"
              onChange={(e) => setMedia(e.target.files[0])}
              id="hidden-file"
            />
            <label htmlFor="hidden-file" className="attachFile">
              <TagsOutlined />
            </label>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChatWindow;
