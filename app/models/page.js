"use server";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import Models from "./models";

async function getModels() {
  const res = await fetch(
    process.env.API + "/api/models?populate[0]=profile_pic&",
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function ModelsServer() {
  const data = await getModels();
  const models = [];

  for (let i = 0; i < data.data.length; i++) {
    if(!data.data[i].attributes.Premium){
    models.push({
      display_name: data.data[i].attributes.display_name,
      profile_pic: data.data[i].attributes.profile_pic.data.attributes.url,
    });
  }
  }
  models.sort((a, b) => a.display_name.localeCompare(b.display_name));

  return <Models models={models} />;
}
