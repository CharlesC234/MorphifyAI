"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import useSWR from "swr";
import ImageLayout from "@/components/ImageLayout";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR(
    "http://localhost:1337/api/models?populate=*",
    fetcher
  );

  if (data == undefined) {
    return <div style={{ backgroundColor: "#000000", height: 1000 }}></div>;
  }

  const dataArr = data.data.reverse();
  const newDataArr = [];
  const arrRecords = [];
  for (let i = 0; i < 12; i++) {
    var rand = -1;
    var randimg = -1;
    if (rand == -1) {
      rand = Math.floor(Math.random() * (dataArr.length - 0)) + 0;
      randimg =
        Math.floor(
          Math.random() * (dataArr[rand].attributes.free_images.data.length - 0)
        ) + 0;
    }
    while (arrRecords.includes(rand.toString() + randimg.toString())) {
      rand = Math.floor(Math.random() * (dataArr.length - 0)) + 0;
      randimg =
        Math.floor(
          Math.random() * (dataArr[rand].attributes.free_images.data.length - 0)
        ) + 0;
    }
    console.log("rand " + rand + "randimg " + randimg);
    arrRecords.push(rand.toString() + randimg.toString());
    newDataArr.push({
      display_name: dataArr[rand].attributes.display_name,
      profile_pic: dataArr[rand].attributes.profile_pic.data.attributes.url,
      image: dataArr[rand].attributes.free_images.data[randimg].attributes.url,
    });
  }

  const categories = [
    "Latina",
    "White",
    "Black",
    "Arab",
    "Indian",
    "Asian",
    "Young",
    "Thick",
    "Skinny",
    "MILF",
  ];
  return (
    <div style={{ backgroundColor: "#000000" }}>
      <script
        src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"
        integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D"
        crossorigin="anonymous"
        async
      ></script>
      <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>

      <div class="container" style={{ backgroundColor: "#000000" }}>
        <h4
          class="fw-bold"
          style={{
            color: "#ffffff",
            fontSize: "1.25rem",
            marginTop: "2.5rem",
            marginBottom: ".4rem",
          }}
        >
          Categories:
        </h4>
        <ul
          class=" w-full flex overflow-x-hidden py-3"
          style={{ backgroundColor: "#000000" }}
        >
          {categories.map((item, index) => {
            if (index == 0) {
              return (
                <li
                  key={index}
                  class="px-3 py-2 rounded-full fw-bold"
                  style={{
                    backgroundColor: "rgba(33,37,41,1)",
                    fontSize: ".95rem",
                    marginRight: ".4rem",
                  }}
                >
                  {item}
                </li>
              );
            }
            return (
              <li
                key={index}
                style={{
                  backgroundColor: "rgba(33,37,41,1)",
                  fontSize: ".95rem",
                  marginRight: ".4rem",
                  marginLeft: ".4rem",
                }}
                class="px-3 py-2 bg-gray-700 rounded-full fw-bold"
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div class="container mt-4" style={{ backgroundColor: "#000000" }}>
        <ImageLayout dataArr={newDataArr} />
      </div>

      <div style={{ height: 0, backgroundColor: "#000000" }} />
    </div>
  );
}
