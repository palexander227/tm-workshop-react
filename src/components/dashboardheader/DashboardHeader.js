import { Button } from "antd";
import React from "react";
import { actionLogout } from "../../store/reducer/user";
import "./DashboardHeader.css";
import { useDispatch, useSelector } from "react-redux";

const DashboardHeader = () => {
  const { user } = useSelector((state) => state.userStore);

  const dispatch = useDispatch();

  return (
    <div className="header">
      <div>
        <h1>Dashboard</h1>
        <span className="username formobile"> {user.username}</span>
      </div>

      <div>
        <span className="username forDesktop">{user.username}</span>
        <Button type="primary" onClick={() => dispatch(actionLogout())}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
