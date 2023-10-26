import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import React from "react";
import Explore from "./Explore/page";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

async function getData() {
  const res = await fetch(
    process.env.API +
      "/api/models?populate[0]=profile_pic&populate[1]=free_images&random=true",
    { cache: "no-cache"}
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getCats() {
  const res = await fetch(
    process.env.API +
      "/api/categories?populate[0]=models&populate[1]=models.free_images&populate[2]=models.profile_pic",
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getPostData() {
  const res = await fetch(process.env.API + "/api/posts?populate=*", {
    cache: "no-store",
    next: { tags: ["postdata"] },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}


export default async function Home({ searchParams, children }) {
  //get data
  const data = await getData();
  const cats = await getCats();
  const posts = await getPostData();

  const headersList = headers();
  const pathname = headersList.get("x-invoke-path");

  if (searchParams.revalidate) {
    revalidateTag("postdata");
  }

  //sort images based on input
  var catSelected = 0;

  if (searchParams.sort == undefined) {
    catSelected = 0;
  } else {
    catSelected = searchParams.sort;
  }


  const newDataArr = [];

  if (catSelected == 0) {
    var thisData = data.data;
    for (let i = 0; i < thisData.length; i++) {
      for (let j = 0; j < thisData[i].attributes.free_images.data.length; j++) {
        if(!thisData[i].attributes.Premium){
          newDataArr.push({
            display_name: thisData[i].attributes.display_name,
            profile_pic: thisData[i].attributes.profile_pic.data.attributes.url,
            image: thisData[i].attributes.free_images.data[j].attributes.url,
            blurhash: thisData[i].attributes.free_images.data[j].attributes.placeholder,
            imgid: thisData[i].attributes.free_images.data[j].id,
            id: thisData[i].id,
            upvotes: null,
            downvotes: null,
            postid: null,
        })
      }
      }
    }
  } else {
    var thisData = cats.data[catSelected - 1].attributes.models.data;
    for (let i = 0; i < thisData.length; i++) {
      for (let j = 0; j < thisData[i].attributes.free_images.data.length; j++) {
        if(!thisData[i].attributes.Premium){
          newDataArr.push({
            display_name: thisData[i].attributes.display_name,
            profile_pic: thisData[i].attributes.profile_pic.data.attributes.url,
            image: thisData[i].attributes.free_images.data[j].attributes.url,
            blurhash: thisData[i].attributes.free_images.data[j].attributes.placeholder,
            imgid: thisData[i].attributes.free_images.data[j].id,
            id: thisData[i].id,
            upvotes: null,
            downvotes: null,
            postid: null,
          });
        }
      }
    }
  }

  for (let i = 0; i < newDataArr.length; i++) {
    for (let j = 0; j < posts.data.length; j++) {
      if (newDataArr[i]) {
        if (newDataArr[i].imgid == posts.data[j].attributes.ImgId) {
          newDataArr[i].upvotes = posts.data[j].attributes.upvotes;
          newDataArr[i].downvotes = posts.data[j].attributes.downvotes;
          newDataArr[i].postid = posts.data[j].id;
        }
      }
    }
    if (
      !newDataArr[i].upvotes &&
      !newDataArr[i].downvotes &&
      newDataArr.length > posts.data.length
    ) {
      fetch(process.env.API + `/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { upvotes: 0, downvotes: 0, ImgId: newDataArr[i].imgid },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          newDataArr[i].upvotes = 0;
          newDataArr[i].downvotes = 0;
          newDataArr[i].postid = data.id;
        })
        .catch((error) => {
          console.error("Error updating model:", error);
        });
    }
  }

  revalidateTag("postdata");

  const categories = [];
  categories.push("Top Pics");

  for (let i = 0; i < cats.data.length; i++) {
    categories.push(cats.data[i].attributes.Category_Name);
  }

  function randomSort(a, b) {
    const diffA = b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
    const diffB = b.upvotes - b.downvotes - (b.upvotes - b.downvotes);
  
    if (diffA !== diffB) {
      return diffA - diffB;
    } else {
      return Math.random() - 0.5;
    }
  }
  
  newDataArr.sort(randomSort);

  for(let i = 0; i < newDataArr.length; i++){
    if(i % 7 == 0){
      newDataArr.splice(i, 0, "Ad");
    }
  }

  return (
    <Explore
      sp={searchParams}
      categories={categories}
      data={data}
      cats={cats}
      newDataArr={newDataArr}
    />
  );
}
