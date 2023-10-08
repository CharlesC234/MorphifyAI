"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import ImageLayout from "@/components/ImageLayout";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Explore({ categories, newDataArr }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [clicked, setClicked] = useState(0);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div class="max-sm:px-0" style={{ backgroundColor: "#000000" }}>
      <div class="container" style={{ backgroundColor: "#000000" }}>
        <h4
          class="fw-bold ms-1"
          style={{
            color: "#ffffff",
            fontSize: "1.35rem",
            marginTop: "2rem",
            marginBottom: "0rem",
          }}
        >
          Categories:
        </h4>
        <ul
          class=" w-full flex overflow-auto no-scrollbar py-3"
          style={{ backgroundColor: "#000000" }}
        >
          {categories.map((item, index) => {
            return (
              <li key={index} class={`py-1 w-fit ${index == 0 ? "pe-1" : "px-1"}`}>
                <button
                  data-toggle="button"
                  
                  onClick={() => {
                    router.push(
                      pathname + "?" + createQueryString("sort", index)
                    );
                   setClicked(index);
                  }}
                  style={{
                    paddingLeft: 17.5,
                    fontWeight: "700",
                    paddingRight: 17.5,
                    paddingBottom: 7.5,
                    paddingTop: 7.5,
                    borderRadius: 10,
                  }}
                  class={`whitespace-nowrap flex md:hover:bg-zinc-700
                ${
                  clicked == index
                    ? "bg-pink-500 text-black"
                    : "bg-zinc-800 "
                }`}
                >
                  {" "}
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div class="container mt-4" style={{ backgroundColor: "#000000" }}>
        <ImageLayout dataArr={newDataArr} />
      </div>
    </div>
  );
}
