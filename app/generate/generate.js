"use client";

import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import createImage from "../actions/createImage";
import { use, useState } from "react";

export default function Generate({ fields }) {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div class="container">
      <div style={{ height: 25 }} />
      {fields.map((item) => {
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
                index == 0
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
          setImg(await createImage(formData));
        }}
      >
        <input placeholder="enter prompt here" type="text" name="prompt" />
        <button type="submit" class="btn btn-primary">
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
