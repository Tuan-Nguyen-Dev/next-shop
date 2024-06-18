import { ImagePicker } from "@/components";
import { Form, Input, Modal } from "antd";
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
    onClose();
  };
  return (
    <Modal
      loading={isLoading}
      open={visible}
      onCancel={handleClose}
      title="Add new categorry"
    >
      <div className="mb-3">
        <Input size="large" placeholder="Title" maxLength={150} allowClear />
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
