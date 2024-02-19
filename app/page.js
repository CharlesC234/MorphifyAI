import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import React, { use } from "react";
import Explore from "./Explore/page";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { getUserData } from "../serverComponents/patreon";
import { getUserDataStrapi } from "../serverComponents/patreon";

async function getData() {
  const res = await fetch(
    process.env.API +
      "/api/models?populate[0]=profile_pic&populate[1]=free_images&random=true&filters[Public][$ne]=false",
    { cache: "no-cache" }
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

async function getDiscordAccessToken(code) {
  try {
    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `code=${code}&grant_type=authorization_code&client_id=${process.env.DISCORD_CLIENT_ID}&client_secret=${process.env.DISCORD_CLIENT_SECRET}&redirect_uri=https://stunner-production-c449.up.railway.app/generate`,
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    throw error;
  }
}

export default async function Home({ searchParams }) {
  //get data
  const data = await getData();
  const cats = await getCats();
  const posts = await getPostData();
  var code;
  let accessToken = null;
  let pid = null;
  let firstSignIn = false;

  if (searchParams.code) {
    code = searchParams.code;
    await getDiscordAccessToken(code).then(async (res) => {
      accessToken = res;
      await getUserData(accessToken).then(async (UserData) => {
        pid = UserData.id;
        await getUserDataStrapi(pid).then((res) => {
          if (res.data.length == 0) {
            firstSignIn = true;
            fetch(process.env.API + `/api/discord-users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  User_Name: UserData.username,
                  Email: null,
                  Discord_Access_Token: accessToken,
                  Premium: false,
                  Generations: 1,
                  pid: pid,
                },
              }),
            });
          }
        });
      });
    });
  }

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
        newDataArr.push({
          display_name: thisData[i].attributes.display_name,
          profile_pic: thisData[i].attributes.profile_pic.data.attributes.url,
          image: thisData[i].attributes.free_images.data[j].attributes.url,
          blurhash:
            thisData[i].attributes.free_images.data[j].attributes.placeholder,
          imgid: thisData[i].attributes.free_images.data[j].id,
          id: thisData[i].id,
          upvotes: null,
          downvotes: null,
          postid: null,
        });
      }
    }
  } else {
    var thisData = cats.data[catSelected - 1].attributes.models.data;
    for (let i = 0; i < thisData.length; i++) {
      for (let j = 0; j < thisData[i].attributes.free_images.data.length; j++) {
        newDataArr.push({
          display_name: thisData[i].attributes.display_name,
          profile_pic: thisData[i].attributes.profile_pic.data.attributes.url,
          image: thisData[i].attributes.free_images.data[j].attributes.url,
          blurhash:
            thisData[i].attributes.free_images.data[j].attributes.placeholder,
          imgid: thisData[i].attributes.free_images.data[j].id,
          id: thisData[i].id,
          upvotes: null,
          downvotes: null,
          postid: null,
        });
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
        .catch((error) => {});
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
  for (let i = 0; i < newDataArr.length; i++) {
    if (i % 7 == 0 && i > 7) {
      newDataArr.splice(i, 0, "Ad");
    }
  }
  

  return (
    <Explore
      pid={pid}
      accessToken={accessToken}
      sp={searchParams}
      categories={categories}
      data={data}
      cats={cats}
      newDataArr={newDataArr}
      firstSignIn={firstSignIn}
    />
  );
}
