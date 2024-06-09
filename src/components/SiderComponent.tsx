import { Layout, Menu, MenuProps } from "antd";
import Link from "next/link";
import React from "react";
import { BiHome, BiUser } from "react-icons/bi";
import { MdLocalOffer } from "react-icons/md";
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const SiderComponent = () => {
  const items: MenuItem[] = [
    {
      key: "home",
      label: <Link href={"/"}>Home</Link>,
      icon: <BiHome />,
    },
    {
      key: "users",
      label: <Link href={"/users"}>Users</Link>,
      icon: <BiUser />,
    },
    {
      key: "offers",
      label: <Link href={"/offers"}>Offers</Link>,
      icon: <MdLocalOffer />,
    },
  ];
  return (
    <Sider style={{ height: "100vh" }}>
      <Menu items={items} theme="dark" />
    </Sider>
  );
};

export default SiderComponent;
