import { ImagePicker } from "@/components";
import { collectionNames } from "@/constants/collectionNames";
import { firebase } from "@/firebases/firebaseConfig";
import { HandleFile } from "@/utils/handleFile";
import { Form, Input, message, Modal } from "antd";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const AddNewCategory = (props: Props) => {
  const { visible, onClose } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<any[]>([]);

  const handleClose = () => {
    setTitle("");
    setFiles([]);
    onClose();
  };

  const handleAddNewCategory = async (values: any) => {
    if (!title) {
      message.error("Missing title");
    } else if (files.length === 0) {
      message.error("Missing files");
    } else {
      setIsLoading(true);
      try {
        const snap = await addDoc(collection(firebase, "categories"), {
          title,
        });
        if (files) {
          await HandleFile.HandleFiles(files, snap.id, "categories");
        }
        handleClose();
        setIsLoading(false);
      } catch (error: any) {
        message.error(error.message);
        console.log(error);
        setIsLoading(false);
      }
    }
  };
  return (
    <Modal
      loading={isLoading}
      onOk={handleAddNewCategory}
      open={visible}
      onCancel={handleClose}
      title="Add new categorry"
    >
      <div className="mb-3">
        <Input
          size="large"
          placeholder="Title"
          maxLength={150}
          allowClear
          value={title}
          onChange={(val) => setTitle(val.target.value)}
        />
        {files.length > 0 && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(files[0])}
              style={{
                width: 200,
                height: "auto",
              }}
              alt=""
            />
          </div>
        )}
        <ImagePicker
          isLoading={isLoading}
          onSelected={(vals) => setFiles(vals)}
        />
      </div>
    </Modal>
  );
};

export default AddNewCategory;
