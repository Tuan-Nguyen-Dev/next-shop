/* eslint-disable @next/next/no-img-element */
import { HeadComponent, ImagePicker } from "@/components";
import { firebase } from "@/firebases/firebaseConfig";
import { Button, Card, Divider, Form, Input, Select, Space } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Products from ".";
import { HandleFile } from "@/utils/handleFile";

const { Option } = Select;
const AddSubPrduct = () => {
  const [sizes, setSizes] = useState([
    "S",
    "XS",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
  ]);
  const [sizeValue, setSizeValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const [form] = Form.useForm();

  const id = searchParams.get("id");

  const handleAddSubProduct = async (values: any) => {
    const data: any = {};
    setIsLoading(true);

    for (const i in values) {
      data[`${i}`] = values[i] ?? "";
    }

    try {
      if (id) {
        const snap = await addDoc(collection(firebase, "subProducts"), {
          ...data,
          productId: id,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        if (files) {
          await HandleFile.HandleFiles(files, snap.id, "subProducts");
        }
        setIsLoading(false);
        window.history.back();
        form.resetFields();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <HeadComponent title="Add sub product" pageTitle="Add New Product" />
      <div className="col-md-8 offset-md-2">
        <Card>
          <Form layout="vertical" onFinish={handleAddSubProduct} form={form}>
            <Form.Item name={"color"} label="Color">
              <Input type="color" style={{ width: "20%", padding: 0 }} />
            </Form.Item>
            <Form.Item name={"size"} label="Size">
              <Select
                allowClear
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ padding: 0 }} />
                    <Space.Compact>
                      <Input
                        allowClear
                        placeholder=""
                        value={sizeValue}
                        onChange={(val) => setSizeValue(val.target.value)}
                        onPressEnter={() => {
                          if (!sizes.includes(sizeValue)) {
                            setSizes([...sizes, sizeValue]);
                            setSizeValue("");
                          }
                        }}
                      />
                    </Space.Compact>
                  </>
                )}
              >
                {sizes.map((size, index) => (
                  <Option key={index} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={"price"} label="Price">
              <Input type="number" />
            </Form.Item>
          </Form>
          <Space wrap>
            {files.length > 0 &&
              Object.keys(files).map(
                (key: any) =>
                  key !== "length" && (
                    <img
                      key={`key`}
                      src={URL.createObjectURL(files[key as number])}
                      style={{
                        width: 200,
                        height: 200,
                      }}
                      alt=""
                    />
                  )
              )}
          </Space>

          <ImagePicker
            multiple
            isLoading={isLoading}
            onSelected={(vals) => setFiles(vals)}
          />
          <div className="mt-3 text-right">
            <Button onClick={() => form.submit()}>Pushlish</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddSubPrduct;
