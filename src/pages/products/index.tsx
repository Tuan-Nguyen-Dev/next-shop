import { AvatarComponent, HeadComponent } from "@/components";
import CategoryComponent from "@/components/CategoryComponent";
import { firebase } from "@/firebases/firebaseConfig";
import { ProductModel } from "@/models/ProductModel";
import { Button, Space, Tag, Tooltip } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import {
  addDoc,
  collection,
  deleteField,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FcAddImage } from "react-icons/fc";

const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    onSnapshot(collection(firebase, "products"), (snap) => {
      if (snap.empty) {
        console.log("Data not found");
        setProducts([]);
      } else {
        const items: ProductModel[] = [];
        snap.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
          });
        });
        setProducts(items);
      }
    });
  }, []);

  const columns: ColumnProps<ProductModel>[] = [
    {
      key: "img",
      dataIndex: "",
      render: (item: ProductModel) => (
        <AvatarComponent
          imageUrl={item.imageUrl}
          id={item.files && item.files.length > 0 ? item.files[0] : undefined}
          path="files"
        />
      ),
    },
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "type",
      title: "Type",
      dataIndex: "type",
    },
    {
      key: "cat",
      title: "Categories",
      dataIndex: "categories",
      render: (ids: string[]) =>
        ids &&
        ids.length > 0 && (
          <Space>
            {ids.map((id) => (
              <Tag key={id}>
                <CategoryComponent key={id} id={id} />
              </Tag>
            ))}
          </Space>
        ),
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "",
      key: "",
      align: "right",
      dataIndex: "",
      render: (item) => (
        <Space>
          <Tooltip title="Add sub product">
            <Button
              icon={
                <FcAddImage
                  size={22}
                  onClick={() =>
                    router.push(`/products/add-sub-product?id=${item.id}`)
                  }
                />
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <HeadComponent
        title="Product"
        pageTitle="Product"
        extra={
          <Button
            type="primary"
            onClick={() => router.push("/products/add-new-product")}
          >
            Add New
          </Button>
        }
      />
      <Table columns={columns} dataSource={products} />
    </div>
  );
};

export default Products;
