import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import { headers } from "next/headers";
import PerModel from "./perModel";
import { revalidateTag } from "next/cache";

async function getModels() {
  const res = await fetch(
    process.env.API +
      "/api/models?populate[0]=profile_pic&populate[1]=free_images&random=true",
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

export default async function modelPage({ searchParams }) {
  const data = await getModels();
  const posts = await getPostData();

  const headersList = headers();
  const pathname = headersList.get("x-invoke-path");

  if (searchParams.revalidate) {
    revalidateTag("postdata");
  }

  const names = [];
  const newDataArr = [];
  var pageExists = false;
  var modelIndex;

  for (let i = 0; i < data.data.length; i++) {
    names.push(data.data[i].attributes.display_name);
  }

  for (let i = 0; i < names.length; i++) {
    if (pathname.toUpperCase() == "/" + names[i].toUpperCase()) {
      pageExists = true;
      modelIndex = i;
    }
  }

  if (pageExists) {
    for (
      let i = 0;
      i < data.data[modelIndex].attributes.free_images.data.length;
      i++
    ) {
        newDataArr.push({
          display_name: data.data[modelIndex].attributes.display_name,
          profile_pic:
            data.data[modelIndex].attributes.profile_pic.data.attributes.url,
          image:
            data.data[modelIndex].attributes.free_images.data[i].attributes.url,
          blurhash: data.data[modelIndex].attributes.free_images.data[i].attributes.placeholder,
          imgid: data.data[modelIndex].attributes.free_images.data[i].id,
          id: data.data[modelIndex].id,
          upvotes: null,
          downvotes: null,
          postid: null,
        });
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
        fetch(process.env.API + "/api/posts", {
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


    return (
      <PerModel newDataArr={newDataArr} modelIndex={modelIndex} data={data} sp={searchParams}/>
    );
  } else {
    return (
      <div
        className="container"
        style={{ backgroundColor: "#000000", height: 1000 }}
      >
        <h1 class="pt-4" style={{ color: "#ffffff" }}>
          404 - Page Not Found
        </h1>
      </div>
    );
  }
}
