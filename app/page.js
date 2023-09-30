"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect ,useState } from "react";
import Page from "./home";

export default function Home() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);
  return<Page>
  </Page>
}
