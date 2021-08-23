import React, { useState, useEffect } from "react";
import "./MessangerDrawer.css";
import { Drawer, Input, message } from "antd";
import MiniChat from "../minichat/MiniChat";
import { images } from "../../assets/images";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import userServ from "../../service/user";
import { useSelector } from "react-redux";

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

const MessangerDrawer = ({ showMessenger }) => {
  const [showuser, setShowUser] = useState(false);
  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const { user } = useSelector((state) => state.userStore);

  const fetchAllUser = async () => {
    try {
      const res = await userServ.getAllUser();
      setUserData(res.users);
      setFilterData(res.users);
    } catch (err) {
      message.error("Unable to fetch student, please reload. Reason: " + err);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleSearch = (e) => {
    const filterUser = userData.filter((user) =>
      user.firstName.toLowerCase().includes(e?.target?.value.toLowerCase())
    );
    setFilterData(filterUser);
  };

  const handleShowHide = () => {
    if (showuser === false) {
      setShowUser(true);
    } else {
      setShowUser(false);
    }
  };

  return (
    <div className={showuser ? "chat-user active" : "chat-user"}>
      <div className="arror" onClick={handleShowHide}>
        {showuser ? <DownOutlined /> : <UpOutlined />}
        <img src={images.msgicon} alt="msgicon" />
      </div>

      <div className="search-box">
        <Input placeholder="Search..." onChange={handleSearch} />
      </div>

      <div className="user-list">
        {filterData.map((item) =>
          user.id !== item.id ? (
            <MiniChat showMessenger={showMessenger} item={item} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default MessangerDrawer;
