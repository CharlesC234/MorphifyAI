"use server";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import React from "react";
import Navbar from "../components/layout/Navbar";

async function getModels() {
  const res = await fetch(process.env.API + "/api/models?populate=*", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const getPatreonAccessToken = async (code) => {
  try {
    const response = await fetch('https://www.patreon.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `code=${code}&grant_type=authorization_code&client_id=${process.env.PATREON_CLIENT_ID}&client_secret=${process.env.PATREON_CLIENT_SECRET}&redirect_uri=http://localhost:3000`,
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    throw error;
  }
};

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
