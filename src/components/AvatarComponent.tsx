import { firebase } from "@/firebases/firebaseConfig";
import { Avatar } from "antd";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type Props = {
  path: string;
  id: string;
};
const AvatarComponent = (props: Props) => {
  const { path, id } = props;

  const [fileInfo, setfileInfo] = useState<{
    downloadUrl: string;
    path: string;
  }>();

  useEffect(() => {
    getFileInfo();
  }, [path, id]);

  const getFileInfo = async () => {
    const api = `${path}/${id}`;

    try {
      const snap: any = await getDoc(doc(firebase, api));
      if ((await snap).exists()) {
        setfileInfo({
          id: snap.id,
          ...snap.data(),
        });
      } else {
        console.log(`File not found`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return fileInfo ? <Avatar src={fileInfo.downloadUrl} /> : <></>;
};

export default AvatarComponent;
