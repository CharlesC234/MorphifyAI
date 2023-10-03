import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import { headers } from "next/headers";
import PerModel from "./perModel";

async function getModels() {
  const res = await fetch('http://127.0.0.1:1337/api/models?populate[0]=profile_pic&populate[1]=free_images', { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function modelPage() {

  const data = await getModels();


  const headersList = headers();
  const pathname = headersList.get("x-invoke-path");

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
      });
    }
    console.log(newDataArr);

    return <PerModel newDataArr={newDataArr} modelIndex={modelIndex} data={data}/>

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