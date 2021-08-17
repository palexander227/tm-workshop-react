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

const data = [
  {
    id: 1,
    name: "Britt Brooke",
    lastmsg: "Thanks for helping me",
  },
  {
    id: 2,
    name: "George Eads",
    lastmsg: "Thanks for helping me",
  },
  {
    id: 3,
    name: "Selena Gomez",
    lastmsg: "Thanks for helping me",
  },
  {
    id: 4,
    name: "James Franco",
    lastmsg: "Thanks for helping me",
  },
  {
    id: 5,
    name: "Dwayne Johnson",
    lastmsg: "Thanks for helping me",
  },
  {
    id: 6,
    name: "Octavia Spencer",
    lastmsg: "Thanks for helping me",
  },
  {
    id: 7,
    name: "Margot Robbie",
    lastmsg: "Thanks for helping me",
  },
  {
    id: 8,
    name: "Nicolas Cage",
    lastmsg: "Thanks for helping me",
  },
  {
    id: 9,
    name: "Tiffany Haddish",
    lastmsg: "Thanks for helping me",
  },
  {
    id: 10,
    name: "Johnny Depp",
    lastmsg: "Thanks for helping me",
  },
];

const Dashboard = () => {
  const [workspace, setWorkspace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.userStore);
  const [users, setUsers] = useState([]);

  const fetchAllWorkSpace = async () => {
    try {
      const res = await workspaceServ.getAllWorkSpace();
      setWorkspace(res.workspaces);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllWorkSpace();
  }, []);

  const handleClose = (id) => {
    setUsers((preVal) => {
      return preVal.filter((item) => {
        return item.id !== id;
      });
    });
  };

  const showMessenger = (id) => {
    const neww = data.filter(
      (item) => item.id == id && users[0]?.id !== item.id
    );
    if (neww.length > 0) {
      if (users.length < 2) {
        setUsers([...users, neww[0]]);
      } else {
        message.warning("Maximum two messenger allowed!");
      }
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
          <div className="message-icon">
            <MessangerDrawer showMessenger={showMessenger} />
          </div>
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
