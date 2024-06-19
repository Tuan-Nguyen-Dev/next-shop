import { firebase } from "@/firebases/firebaseConfig";
import { CategoryModel } from "@/models/CategoryModel";
import { Avatar } from "antd";
import { doc, getDoc } from "firebase/firestore";
import React, { use, useEffect, useState } from "react";

type Props = {
  id?: string;
};
const CategoryComponent = (props: Props) => {
  const { id } = props;

  const [categories, setCategories] = useState<CategoryModel>();

  useEffect(() => {
    id && getCategories();
  }, [id]);

  const getCategories = async () => {
    const api = `${"categories"}/${id}`;

    try {
      const snap: any = await getDoc(doc(firebase, api));
      if ((await snap).exists()) {
        setCategories({
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
  return categories ? categories.title : "";
};

export default CategoryComponent;
