"use server";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import React from "react";
import Navbar from "@/components/layout/Navbar";

async function getModels() {
  const res = await fetch(process.env.API + "/api/models?populate=*", {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Search({}) {
  const dataModels = await getModels();
  const searchArr = [];

  for (let i = 0; i < dataModels.data.length; i++) {
    searchArr.push({
      display_name: dataModels.data[i].attributes.display_name,
      profile_pic:
        dataModels.data[i].attributes.profile_pic.data.attributes.url,
    });
  }

  return <Navbar searchArr={searchArr}></Navbar>;
}
