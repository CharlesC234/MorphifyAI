import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import React from "react";
import Explore from "./Explore/page";
import Popup from "@/components/Popup";
import EnterEmail from "@/components/EnterEmail";
import Navbar from "@/components/layout/Navbar";
import { headers } from "next/headers";

async function getData() {
  const res = await fetch('http://127.0.0.1:1337/api/models?populate=*')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getCats() {
  const res = await fetch('http://127.0.0.1:1337/api/categories?populate[0]=models&populate[1]=models.free_images&populate[2]=models.profile_pic')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home({searchParams, children}) {


  //get data
  const data = await getData();
  const cats = await getCats();


  //sort images based on input
  var catSelected = 0;

  if(searchParams.sort == undefined){
    catSelected = 0;
  }else{
  catSelected = searchParams.sort;
  }

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
  
  const newDataArr = [];
  
  if(catSelected == 0){
    var thisData = data.data;
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
    var thisData = cats.data[catSelected - 1].attributes.models.data;
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

  const categories = [];
  categories.push("Top Pics");

  for(let i = 0; i < cats.data.length ; i++){
    categories.push(cats.data[i].attributes.Category_Name);
  }
  

  return <Explore categories={categories} data={data} cats={cats} newDataArr={newDataArr}/>
}