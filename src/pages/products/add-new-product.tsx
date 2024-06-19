/* eslint-disable @next/next/no-img-element */
import { HeadComponent, ImagePicker } from "@/components";
import { firebase } from "@/firebases/firebaseConfig";
import { AddNewCategory } from "@/modals";
import { CategoryModel } from "@/models/CategoryModel";
import { HandleFile } from "@/utils/handleFile";
import { Button, Card, Form, Input, message, Select, Space } from "antd";
import { OptionProps } from "antd/es/select";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";

const AddNewProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isVisibleModalAddCategory, setIsVisibleModalAddCategory] =
    useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    onSnapshot(collection(firebase, "categories"), (snap) => {
      if (snap.empty) {
        console.log("Data not found");
        setCategories([]);
      } else {
        const items: any[] = [];
        snap.forEach((item: any) => {
          items.push({
            value: item.id,
            label: item.data().title,
          });
        });
        setCategories(items);
      }
    });
  };
  const handleAddNewProduct = async (values: any) => {
    setIsLoading(true);

    const data: any = {};

    for (const i in values) {
      data[`${i}`] = values[i] ?? "";
    }

    try {
      const snap = await addDoc(collection(firebase, "products"), {
        ...data,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      if (files) {
        await HandleFile.HandleFiles(files, snap.id, "products");
      }
      setIsLoading(false);
      window.history.back();
      form.resetFields();
    } catch (error: any) {
      message.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <HeadComponent
        title="Add New Product"
        pageTitle="Add New Product"
        extra={
          <Button
            type="primary"
            onClick={() => setIsVisibleModalAddCategory(true)}
            icon={<BiAddToQueue />}
          >
            Add New Categories
          </Button>
        }
      />
      <div className="col-md- offset-md-2">
        <Card title="Form add new">
          <Form
            disabled={isLoading}
            size="large"
            form={form}
            layout="vertical"
            onFinish={handleAddNewProduct}
          >
            <Form.Item
              name={"title"}
              label="Title"
              rules={[
                {
                  required: true,
                  message: "what is product title",
                },
              ]}
            >
              <Input placeholder="" maxLength={150} allowClear />
            </Form.Item>
            <Form.Item name={"type"} label="Type">
              <Input allowClear />
            </Form.Item>
            <Form.Item name={"categories"} label="Categories">
              <Select allowClear mode="multiple" options={categories} />
            </Form.Item>
            <Form.Item name={"description"} label="Description">
              <Input.TextArea rows={3} allowClear />
            </Form.Item>
            <Form.Item name={"price"} label="Price">
              <Input type="number" allowClear />
            </Form.Item>
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
          </Form>
          <div className="mt-3 text-right">
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

      <AddNewCategory
        visible={isVisibleModalAddCategory}
        onClose={() => setIsVisibleModalAddCategory(false)}
      />
    </div>
  );
};

export default AddNewProduct;
