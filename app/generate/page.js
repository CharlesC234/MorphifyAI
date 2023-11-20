"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";

export default function Generate() {
  const [page, setPage] = useState("TOS");
  async function sendRequest() {
    const data = await fetch("/generate/api", { method: "POST" }).then((res) => {
      console.log("data here: " + JSON.stringify(res));
    });
  }

  return (
    <div class="container">
      {/* <img src={""} />

      <input placeholder="enter prompt here" id="prompt" name="prompt"></input>
      <button
        type="submit"
        class="btn btn-primary"
        onClick={() => sendRequest()}
      >
        Generate
      </button> */}
      <h2 class="mt-5 text-2xl font-bold">Ethnicity</h2>
    <div class="flex mt-3">
            <button
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
              class={`me-2 whitespace-nowrap flex md:hover:bg-pink-500
                ${page == "TOS" ? "fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black" : "bg-black outline outline-2 outline-offset-0 outline-pink-500 text-pink-500"}`}
            >
              Terms Of Service
            </button>
            <button
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
                setPage("PP");
              }}
              class={`me-2 ms-1 whitespace-nowrap flex md:hover:bg-pink-500 
              ${
                page == "PP"
                  ? "bg-pink-500 outline outline-2 outline-pink-500 text-black"
                  : "bg-black outline outline-2 outline-offset-0 outline-pink-500 text-pink-500"
              }`}
            >
              Policy Privacy
            </button>
            <button
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
                setPage("C");
              }}
              class={`me-2 ms-1 whitespace-nowrap flex md:hover:bg-pink-500 ${
                page == "C"
                  ? "bg-pink-500 outline outline-2 outline-pink-500 text-black"
                  : "bg-black outline outline-2 outline-offset-0 outline-pink-500 text-pink-500"
              }`}
            >
              Cookies Policy
            </button>
          </div>
    </div>
  );
}
