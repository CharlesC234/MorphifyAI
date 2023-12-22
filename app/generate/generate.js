"use client";

import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import createImage from "../actions/createImage";
import { use, useState } from "react";

export default function Generate({ fields }) {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  var makeArr = [];
  for(let i = 0; i < fields.length; i++){
    makeArr.push({Field: fields[i].attributes.FieldName, Option: fields[i].attributes.Option[0].OptionTitle})
  }
  const [selected, setSelected] = useState(makeArr);
  const [refresh, setRefresh] = useState(false);
  return (
    <div class="container">
      <div style={{ height: 25 }} />
      {fields.map((item, outerIndex) => {
        return (
          <div
            style={{ width: "80%", minWidth: 350 }}
            key={item.attributes.FieldName}
          >
            <h2 class="mt-5 text-2xl font-bold" style={{ opacity: 0.8 }}>
              {item.attributes.FieldName}
            </h2>
            <div class="flex flex-wrap mt-4">
              {item.attributes.Option.map((itemInner, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      var temp = selected;
                      for(let i = 0; i <= selected.length; i++){
                        if(i == outerIndex){
                          temp[i].Option = itemInner.OptionTitle;
                        }
                        setSelected(temp);
                        setRefresh(!refresh);
                      }
                    }}
                    data-toggle="button"
                    style={{
                      paddingLeft: 17.5,
                      fontWeight: "600",
                      paddingRight: 17.5,
                      paddingBottom: 7.5,
                      paddingTop: 7.5,
                      borderRadius: 8.5,
                    }}
                    class={`me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500
              ${
                selected[outerIndex].Option == itemInner.OptionTitle
                  ? "fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
                  : "bg-black outline outline-2 outline-offset-0 outline-pink-500 text-pink-500"
              }`}
                  >
                    {itemInner.OptionTitle}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <form
        action={async (formData) => {
          var prompt = "A very attractive girl, with ";
          for(let i = 0; i < selected.length; i++){
            prompt = prompt + selected[i].Field + ": " + selected[i].Option + ", ";
          }
          prompt = prompt + "posting fully nude for a high quality Instagram photo";
          console.log(prompt);
          setImg(await createImage(formData, prompt ));
        }}
      >
        <button type="submit" class="btn text-xl py-4 px-5 mt-4 me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black">
          Generate
        </button>
      </form>
      {loading ? (
        <div class="spinner-simple"></div>
      ) : (
        <img src={"data:image/png;base64," + img} />
      )}
    </div>
  );
}
