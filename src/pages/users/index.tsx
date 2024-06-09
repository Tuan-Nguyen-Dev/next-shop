import { collectionNames } from "@/constants/collectionNames";
import { firebase } from "@/firebases/firebaseConfig";
import { UserModel } from "@/models/UserModel";
import { Button, Space } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { collection, onSnapshot } from "firebase/firestore";
import React, { use, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
const Users = () => {
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    onSnapshot(collection(firebase, collectionNames.users), (snap) => {
      if (snap.empty) {
        console.log("Data is empty");
      } else {
        const items: any = [];

        snap.forEach((item: any) =>
          items.push({
            id: item.id,
            ...item.data(),
          })
        );

        setUsers(items);
      }
    });
  }, []);

  const colums: ColumnProps<UserModel>[] = [
    {
      key: "Name",
      dataIndex: "displayName",
      title: "User name",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "createdAt",
      dataIndex: "creationTime",
      title: "Sign up",
      render: (val: Date) => new Date(val).toISOString(),
      align: "center",
    },
    {
      key: "btn",
      title: "",
      dataIndex: "",
      render: (item: UserModel) => (
        <Space>
          <Button icon={<BiTrash size={20} />} danger type="text" />
        </Space>
      ),
      align: "center",
    },
  ];

  return <Table dataSource={users} columns={colums}></Table>;
};

export default Users;
