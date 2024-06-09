import { Button, Upload } from "antd";
import React, { useRef } from "react";
import { BiUpload } from "react-icons/bi";

interface Props {
  onSelected: (files: any) => void;
  multiple?: boolean;
  accept?: "";
  isLoading?: boolean;
}

const ImagePicker = (props: Props) => {
  const { onSelected, multiple, accept, isLoading } = props;

  const fileRef = useRef<any>(null);
  return (
    <>
      <Button
        loading={isLoading}
        className="mt-2"
        onClick={() => {
          if (fileRef.current) {
            fileRef.current?.click();
          }
        }}
        icon={<BiUpload size={18} />}
      >
        Upload
      </Button>
      <div className="d-none">
        <input
          type="file"
          ref={fileRef}
          multiple={multiple}
          onChange={(val) => onSelected(val.target.files)}
          accept={accept ?? "image/*"}
          name=""
          id=""
        />
      </div>
    </>
  );
};

export default ImagePicker;
