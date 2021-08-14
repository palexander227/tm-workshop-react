import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/dashboardheader/DashboardHeader";
import WorkspaceCard from "../../components/workspacecard/WorkspaceCard";
import WorkspaceHeader from "../../components/workspaceheader/WorkspaceHeader";
import "./Dashboard.css";
import workspaceServ from "../../service/workspace";
import Loader from "../../components/loader";
import { Alert } from "antd";

const Dashboard = () => {
  const [workspace, setWorkspace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
                <Alert message="No workspace available" type="warning" />
              </div>
            ) : (
              <div className="workspce-card ">
                {workspace.map((work) => (
                  <WorkspaceCard
                    workspace={work}
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
