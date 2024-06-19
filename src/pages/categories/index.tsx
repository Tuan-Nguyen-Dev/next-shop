import { AvatarComponent, HeadComponent } from "@/components";
import { firebase } from "@/firebases/firebaseConfig";
import { AddNewCategory } from "@/modals";
import { CategoryModel } from "@/models/CategoryModel";
import { Button } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [isVisibleModalAddCategory, setIsVisibleModalAddCategory] =
    useState(false);

  const [categories, setCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    onSnapshot(collection(firebase, "categories"), (snap) => {
      if (snap.empty) {
        console.log("Data not found");
        setCategories([]);
      } else {
        const items: CategoryModel[] = [];
        snap.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
          });
        });
        setCategories(items);
      }
    });
  }, []);

  // const handleUpdate = async () => {
  //   if (categories.length > 0) {
  //     categories.forEach(async (cat) => {
  //       if (cat.files && cat.files.length > 0) {
  //         const filed = cat.files[0];

  //         const snap = await getDoc(doc(firebase, `files/${filed}`));
  //         if (snap.exists()) {
  //           const data = snap.data();
  //           await updateDoc(doc(firebase, `categories/${cat.id}`), {
  //             imageUrl: data.downloadUrl,
  //           });
  //         }
  //         console.log("Done updating");
  //       }
  //     });
  //   }
  // };

  const columns: ColumnProps<CategoryModel>[] = [
    {
      key: "img",
      dataIndex: "",
      render: (item: CategoryModel) => (
        <AvatarComponent
          imageUrl={item.imageUrl}
          id={item.files && item.files.length > 0 ? item.files[0] : undefined}
          path="files"
        />
      ),
    },
    {
      key: "title",
      dataIndex: "title",
    },
  ];
  return (
    <div>
      <HeadComponent
        title="Cateogry"
        pageTitle="Categories"
        extra={
          <Button
            onClick={() => setIsVisibleModalAddCategory(true)}
            type="primary"
          >
            Add New
          </Button>
        }
      />
      {/* <Button onClick={handleUpdate} type="primary">
        Update Categories
      </Button> */}

      <Table dataSource={categories} columns={columns} />
      <AddNewCategory
        visible={isVisibleModalAddCategory}
        onClose={() => setIsVisibleModalAddCategory(false)}
      />
    </div>
  );
};

export default Categories;
