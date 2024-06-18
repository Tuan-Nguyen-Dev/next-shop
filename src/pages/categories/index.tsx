import { HeadComponent } from "@/components";
import { AddNewCategory } from "@/modals";
import { Button } from "antd";
import React, { useState } from "react";

const Categories = () => {
  const [isVisibleModalAddCategory, setIsVisibleModalAddCategory] =
    useState(false);
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
      <AddNewCategory
        visible={isVisibleModalAddCategory}
        onClose={() => setIsVisibleModalAddCategory(false)}
      />
    </div>
  );
};

export default Categories;
