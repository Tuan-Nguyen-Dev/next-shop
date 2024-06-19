import { ImagePicker } from "@/components";
import { collectionNames } from "@/constants/collectionNames";
import { firebase } from "@/firebases/firebaseConfig";
import { generatorRandomText } from "@/utils/generatorRandomText";
import { HandleFile } from "@/utils/handleFile";
import { Button, Card, DatePicker, Form, Input } from "antd";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const date = new Date();

const AddNewOffer = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const str = generatorRandomText();
    form.setFieldValue("discount", str);
  }, []);

  const addNewoffer = async (value: any) => {
    const data: any = {};

    for (const i in value) {
      data[`${i}`] = value[i] ?? " ";
    }

    data.startAt = new Date(value.startAt.$d).getTime();
    data.endAt = new Date(value.endAt.$d).getTime();
    console.log(data);
    try {
      const snap = await addDoc(collection(firebase, collectionNames.offers), {
        ...data,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      if (files) {
        await HandleFile.HandleFiles(files, snap.id, "offers");
      }
      form.resetFields();
      window.history.back();
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };
  return (
    <div className="col-md-8 offset-md-2">
      <Card>
        <Form
          disabled={isLoading}
          layout="vertical"
          form={form}
          onFinish={addNewoffer}
        >
          <Form.Item
            name={"title"}
            label="Title"
            rules={[
              {
                required: true,
                message: "Please enter title of offer",
              },
            ]}
          >
            <Input placeholder="title" allowClear />
          </Form.Item>
          <Form.Item name={"description"} label="Description">
            <Input.TextArea rows={2} placeholder="Description" allowClear />
          </Form.Item>

          <div className="row">
            <div className="col">
              <Form.Item
                name={"startAt"}
                initialValue={dayjs(date)}
                label="Start at"
              >
                <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item name={"endAt"} label="End at">
                <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
              </Form.Item>
            </div>
          </div>
          <Form.Item name={"percent"} label="Percent">
            <Input type="number" placeholder="percent" allowClear />
          </Form.Item>
          <Form.Item name={"discount"} label="Discount">
            <Input disabled placeholder="Discount Code" readOnly />
          </Form.Item>
        </Form>
        <div>
          {files.length > 0 && (
            <img
              src={URL.createObjectURL(files[0])}
              style={{
                width: 200,
                height: "auto",
              }}
              alt=""
            />
          )}
        </div>

        <ImagePicker
          isLoading={isLoading}
          onSelected={(vals) => setFiles(vals)}
        />

        <div className="text-right">
          <Button
            loading={isLoading}
            type="primary"
            onClick={() => form.submit()}
          >
            Publish
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddNewOffer;
