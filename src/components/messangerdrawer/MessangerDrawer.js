import React, { useState } from "react";
import "./MessangerDrawer.css";
import { Drawer, Input } from "antd";
import MiniChat from "../minichat/MiniChat";
import { images } from "../../assets/images";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

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
  const [filterData, setFilterData] = useState(data);
  const [showuser, setShowUser] = useState(false);

  const handleSearch = (e) => {
    const filterUser = data.filter((user) =>
      user.name.toLowerCase().includes(e?.target?.value.toLowerCase())
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
        {filterData.map((item) => (
          <MiniChat showMessenger={showMessenger} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MessangerDrawer;
