"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";

export default function Generate({fields}) {
  const [page, setPage] = useState("TOS");
  const sendRequest = async () => {
    await fetch("/generate/api", { method: "POST" }).then((res) => {
      console.log("data here: " + JSON.stringify(res));
    });
  }

  return (
    <div class="container">
      <div style={{height: 25}}/>
      {fields.map((item) => {
        return <div style={{width: '80%', minWidth: 200}}>
          <h2 class="mt-5 text-2xl font-bold" style={{opacity: .8}}>{item.attributes.FieldName}</h2>
          <div class="flex flex-wrap mt-4">
          {item.attributes.Option.map((itemInner, index) => {
            return <button
            data-toggle="button"
            style={{
              paddingLeft: 17.5,
              fontWeight: "600",
              paddingRight: 17.5,
              paddingBottom: 7.5,
              paddingTop: 7.5,
              borderRadius: 8.5,
            }}
            onClick={() => {
              setPage("TOS");
            }}
            class={`me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500
              ${index == 0 ? "fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black" : "bg-black outline outline-2 outline-offset-0 outline-pink-500 text-pink-500"}`}
          >
            {itemInner.OptionTitle}
          </button>
          })}
          </div>
        </div>
      })}

<input placeholder="enter prompt here" id="prompt" name="prompt"></input>
<button
  type="submit"
  class="btn btn-primary"
  onClick={() => sendRequest()}
>
  Generate
</button>
    </div>
  );
}
