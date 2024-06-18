import { AvatarComponent, HeadComponent } from "@/components";
import { collectionNames } from "@/constants/collectionNames";
import { firebase } from "@/firebases/firebaseConfig";
import { OfferModel } from "@/models/OfferModel";
import { UserModel } from "@/models/UserModel";
import { DateTime } from "@/utils/DateTime";
import { HandleFile } from "@/utils/handleFile";
import { Avatar, Button, Modal, Space, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import { time } from "console";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";

const { confirm } = Modal;

const Offers = () => {
  const [offer, setOffer] = useState<OfferModel[]>([]);
  const router = useRouter();
  useEffect(() => {
    onSnapshot(collection(firebase, collectionNames.offers), (snap) => {
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

        setOffer(items);
      }
    });
  }, []);

  const colums: ColumnProps<any>[] = [
    {
      key: "avatars",
      dataIndex: "files",
      title: "",
      render: (ids: string[]) =>
        ids && ids.length > 0 && <AvatarComponent id={ids[0]} path="files" />,
    },
    {
      key: "Title",
      dataIndex: "title",
      title: "Title",
    },
    {
      key: "Percent",
      dataIndex: "percent",
      title: "Percent (%)",
    },
    {
      key: "startAt",
      dataIndex: "startAt",
      title: "Start at",
      render: (time: number) => DateTime.getDate(time),
    },
    {
      key: "endAt",
      dataIndex: "endAt",
      title: "End at",
      render: (time: number) => DateTime.getDate(time),
    },
    {
      key: "discount",
      dataIndex: "discount",
      title: "Discount",
    },

    {
      key: "btn",
      title: "",
      dataIndex: "",
      render: (item: OfferModel) => (
        <Space>
          <Button
            onClick={() =>
              confirm({
                title: "Confirm",
                content: "Delete offer?",
                onOk: () => handleDeleteOffer(item),
              })
            }
            icon={<BiTrash size={20} />}
            danger
            type="text"
          />
        </Space>
      ),
      align: "center",
    },
  ];

  const handleDeleteOffer = async (item: OfferModel) => {
    if (item.files && item.files.length > 0) {
      item.files.forEach(async (fileId) => await HandleFile.removeFile(fileId));
    }

    await deleteDoc(doc(firebase, `${collectionNames.offers}/${item.id}`));

    console.log("Delete Ok");
  };

  return (
    <>
      <HeadComponent
        pageTitle="Offer"
        title="Offers"
        extra={
          <Button
            type="primary"
            onClick={() => router.push("/offers/add-new-offer")}
          >
            Add New
          </Button>
        }
      />
      <Table dataSource={offer} columns={colums} />
    </>
  );
};

export default Offers;
