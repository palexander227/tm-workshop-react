import React, { useState } from "react";
import "./MessangerDrawer.css";
import { Drawer, Input } from "antd";
import MiniChat from "../minichat/MiniChat";
import { images } from "../../assets/images";

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
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState(data);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const myfunnn = (e) => {
    const dede = data.filter((user) =>
      user.name.toLowerCase().includes(e?.target?.value.toLowerCase())
    );

    setFilter(dede);

    console.log(dede);
  };

  return (
    <div>
      <div className="msg-icon">
        <img src={images.msgicon} alt="msgicon" onClick={showDrawer} />
      </div>

      <Drawer
        width={350}
        mask={false}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        closable={true}
      >
        <div className="search-box">
          <Input placeholder="Search..." onChange={myfunnn} />
        </div>
        {filter.map((item) => (
          <MiniChat showMessenger={showMessenger} item={item} />
        ))}
      </Drawer>
    </div>
  );
};

export default MessangerDrawer;
