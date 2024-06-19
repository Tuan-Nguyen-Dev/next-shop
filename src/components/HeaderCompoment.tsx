import { auth } from "@/firebases/firebaseConfig";
import { Layout } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const { Header } = Layout;
const HeaderCompoment = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       router.push("/");
  //     }
  //   });
  // }, []);
  return <Header />;
};

export default HeaderCompoment;
