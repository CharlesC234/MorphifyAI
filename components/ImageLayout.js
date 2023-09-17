"use client";

import styles from "../app/page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "../app/globals.css";
import useSWR from "swr";
import { useState } from "react";

import ImageViewer from "@/components/ImageViewer";

export default function ImageLayout(data) {
  var dataArr = data.dataArr;

  const [photoView, setPhotoView] = useState(false);
  const [selectedIndex, setIndex] = useState(1);

  function selectPhoto(index) {
    setIndex(index);
    setPhotoView(true);
  }

  return (
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {dataArr.map((item, index) => {
        return (
          <a
            onClick={() => selectPhoto(index)}
            key={index}
            class="grid gap-4 cursor-pointer"
          >

            <img
              class="h-auto max-w-full rounded-lg"
              src={"http://localhost:1337" + item.image}
              alt=""
            />
          </a>
  
        );
      })}
      {photoView ? (
        <ImageViewer
          allImages={data}
          setView={setPhotoView}
          index={selectedIndex}
        />
      ) : (
        <div />
      )}
    </div>
  );
}
