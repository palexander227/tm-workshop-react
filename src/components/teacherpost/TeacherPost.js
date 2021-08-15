import React from "react";
import "./TeacherPost.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const TeacherPost = ({ item }) => {
  const { user } = useSelector((state) => state.userStore);

  return (
    <div className="teacher-post">
      <div className="user-icon">
        <Avatar size={40} icon={<UserOutlined />} />
      </div>
      <div>
        <p>
          <strong>{item.title}</strong>
        </p>
        <p>
          {user.firstName} {user.lastName}
        </p>
        <small>Aug 15</small>
        <p>{item.content}</p>
      </div>
    </div>
  );
};

export default TeacherPost;
