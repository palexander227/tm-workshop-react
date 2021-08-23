import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/dashboardheader/DashboardHeader";
import WorkspaceCard from "../../components/workspacecard/WorkspaceCard";
import WorkspaceHeader from "../../components/workspaceheader/WorkspaceHeader";
import "./Dashboard.css";
import workspaceServ from "../../service/workspace";
import Loader from "../../components/loader";
import { Alert, message } from "antd";
import { useSelector } from "react-redux";
import ChatWindow from "../../components/chatbox/ChatWindow";
import MessangerDrawer from "../../components/messangerdrawer/MessangerDrawer";
import userServ from "../../service/user";
import { io } from "socket.io-client";
import chatServ from "../../service/chatroom";

const socket = io(`http://localhost:12000`);
// const socket = io(`https://thoughtmuseum-api.herokuapp.com`);

const Dashboard = () => {
  const [workspace, setWorkspace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.userStore);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);

  const fetchAllUser = async () => {
    try {
      const res = await userServ.getAllUser();
      setUserData(res.users);
    } catch (err) {
      message.error("Unable to fetch student, please reload. Reason: " + err);
    } finally {
      // setIsLoading(false);
    }
  };

  const fetchAllWorkSpace = async () => {
    try {
      const res = await workspaceServ.getAllWorkSpace();
      setWorkspace(res.workspaces);
    } catch (err) {
      message.error(
        "Unable to fetch workspaces, please reload. Reason: " + err
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    await fetchAllUser();
    await fetchAllWorkSpace();
    await realTimeIntraction();
  }, []);

  const realTimeIntraction = () => {
    socket.emit("join", user.id);

    socket.on('userOnline', (data) => {
      console.log({data});
    });

    socket.on('userOffline', (data) => {
      console.log({data});
    })

    socket.on('addMessage', (data) => {
      console.log({data});
    })
  }

  const handleClose = (id) => {
    setUsers((preVal) => {
      return preVal.filter((item) => {
        return item.id !== id;
      });
    });
  };

  const showMessenger = async (id) => {
    const checkExistingUser = users.some((dataa) => dataa.id == id);
    const filterUser = userData.filter(
      (item) => item.id == id && !checkExistingUser
    );

    if (filterUser.length > 0) {
      let newarr = [...users, filterUser[0]];
      const getTwoUsers = newarr.slice(newarr?.length - 2, newarr?.length);
      setUsers(getTwoUsers);
    }
  };

  return (
    <div className="dashboard">
      <DashboardHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="workspace container">
          <WorkspaceHeader fetchAllWorkSpace={fetchAllWorkSpace} />

          {workspace?.length === 0 ? (
            <div className="work-message">
              <Alert
                message={
                  user.role === "teacher"
                    ? "No workspace available!"
                    : "No workspace available! Please contact your teacher."
                }
                type="warning"
              />
            </div>
          ) : (
            <div className="workspce-card ">
              {workspace.map((work) => (
                <WorkspaceCard
                  key={work?.workspace?.id}
                  count={work.count}
                  workspace={work.workspace}
                  fetchAllWorkSpace={fetchAllWorkSpace}
                />
              ))}
            </div>
          )}

          <MessangerDrawer showMessenger={showMessenger} />

          <div className="msg-box">
            {users.map((item) => (
              <ChatWindow key={item.id} item={item} handleClose={handleClose} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
