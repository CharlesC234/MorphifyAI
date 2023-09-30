"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import useSWR from "swr";
import ImageLayout from "@/components/ImageLayout";
import React from "react";
import { useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {

  const [catSelected, setCatSelected] = useState(0);

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


  const data = useSWR(
    "http://localhost:1337/api/models?populate=*",
    fetcher
  );

  const cats = useSWR(
    "http://localhost:1337/api/categories?populate[0]=models&populate[1]=models.free_images&populate[2]=models.profile_pic",
    fetcher
  );

  if (data.data == undefined) {
    return <div style={{ backgroundColor: "#000000", height: 1000 }}/>;
  }
  if (cats.data == undefined) {
    return <div style={{ backgroundColor: "#000000", height: 1000 }}/>;
  }

  const newDataArr = [];
  const categories = [];
  categories.push("Top Pics");

  for(let i = 0; i < cats.data.data.length ; i++){
    categories.push(cats.data.data[i].attributes.Category_Name);
  }

  if(catSelected == 0){
    var thisData = data.data.data;
    for(let i = 0; i < thisData.length; i++){
      for(let j = 0; j < thisData[i].attributes.free_images.data.length; j++){
        newDataArr.push({
          display_name: thisData[i].attributes.display_name,
          profile_pic: thisData[i].attributes.profile_pic.data.attributes.url,
          image: thisData[i].attributes.free_images.data[j].attributes.url,
        });
      }
    }
  }else{
    var thisData = cats.data.data[catSelected - 1].attributes.models.data;
    for(let i = 0; i < thisData.length; i++){
      for(let j = 0; j < thisData[i].attributes.free_images.data.length; j++){
        newDataArr.push({
          display_name: thisData[i].attributes.display_name,
          profile_pic: thisData[i].attributes.profile_pic.data.attributes.url,
          image: thisData[i].attributes.free_images.data[j].attributes.url,
        });
      }
    }
  }
shuffle(newDataArr);


  return (
    <div style={{ backgroundColor: "#000000" }}>
      <script
        src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"
        integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D"
        crossorigin="anonymous"
        async
      ></script>

      <div class="container" style={{ backgroundColor: "#000000" }}>
        <h4
          class="fw-bold"
          style={{
            color: "#ffffff",
            fontSize: "1.35rem",
            marginTop: "2.25rem",
            marginBottom: ".4rem",
          }}
        >
          Categories:
        </h4>
        <ul
          class=" w-full flex overflow-x-scroll py-3"
          style={{ backgroundColor: "#000000" }}
        >
          {categories.map((item, index) => {
            return (
              <li key={index} class="px-1 py-1">
                <button  data-toggle="button" onClick={() => setCatSelected(index)} 
                style={{paddingLeft: 17.5, fontWeight: '600', paddingRight: 17.5, paddingBottom: 7.5, paddingTop: 7.5, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, .2)'}}
                class="hover:bg-black active:bg-black focus:outline-none focus:ring-2 focus:ring-white"> {item}</button>
              </li>
            );
          })}
        </ul>
      </div>
      <div class="container mt-4" style={{ backgroundColor: "#000000" }}>
        <ImageLayout dataArr={newDataArr} />
      </div>

      <div style={{ height: 500, backgroundColor: "#000000" }} />
    </div>
  );
}
