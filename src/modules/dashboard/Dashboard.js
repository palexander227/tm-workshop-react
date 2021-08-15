import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/dashboardheader/DashboardHeader";
import WorkspaceCard from "../../components/workspacecard/WorkspaceCard";
import WorkspaceHeader from "../../components/workspaceheader/WorkspaceHeader";
import "./Dashboard.css";
import workspaceServ from "../../service/workspace";
import Loader from "../../components/loader";
import { Alert } from "antd";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [workspace, setWorkspace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.userStore);

  const fetchAllWorkSpace = async () => {
    try {
      const res = await workspaceServ.getAllWorkSpace();
      console.log("workkkkk", res.workspaces);
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

  return (
    <div className="dashboard">
      <DashboardHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
