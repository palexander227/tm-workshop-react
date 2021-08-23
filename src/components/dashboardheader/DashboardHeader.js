import React from "react";
import { actionLogout } from "../../store/reducer/user";
import "./DashboardHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets/images";
import { Avatar, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const DashboardHeader = () => {
  const { user } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const history = useHistory();

  const menu = (
    <Menu>
      <Menu.Item className="profile" onClick={() => history.push("/myprofile")}>
        My Profile
      </Menu.Item>
      <Menu.Item className="profile" onClick={() => dispatch(actionLogout(user))}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      <img onClick={() => history.push("/")} src={images.logo} alt="logo" />
      <div className="userdropdown">
        <span className="username forDesktop">{user.firstName}</span>
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <div className="user-Icon">
            <Avatar size={45} icon={<UserOutlined />} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default DashboardHeader;
