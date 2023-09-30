"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import React, { useCallback } from "react";
import { useState } from "react";
import ImageLayout from "@/components/ImageLayout";
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";


export default function Explore({categories, newDataArr}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )


  return (
    <div style={{ backgroundColor: "#000000" }}>
      <script
        src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"
        integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D"
        crossorigin="anonymous"
        async
      ></script>

      <div class="container" style={{ backgroundColor: "#000000" }}>
        <h4
          class="fw-bold"
          style={{
            color: "#ffffff",
            fontSize: "1.35rem",
            marginTop: "2.25rem",
            marginBottom: ".4rem",
          }}
        >
          Categories:
        </h4>
        <ul
          class=" w-full flex overflow-x-hidden py-3"
          style={{ backgroundColor: "#000000" }}
        >
          {categories.map((item, index) => {
            return (
              <li key={index} class="px-1 py-1">
                <button  data-toggle="button" onClick={() => {router.push(pathname + '?' + createQueryString('sort', index))}} 
                style={{paddingLeft: 17.5, fontWeight: '600', paddingRight: 17.5, paddingBottom: 7.5, paddingTop: 7.5, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, .2)'}}
                class="hover:bg-black active:bg-black focus:outline-none focus:ring-2 focus:ring-white"> {item}</button>
              </li>
            );
          })}
        </ul>
      </div>
      <div class="container mt-4" style={{ backgroundColor: "#000000" }}>
      <ImageLayout dataArr={newDataArr} /> 
      </div>

      <div style={{ height: 500, backgroundColor: "#000000" }} />
    </div>
  );
}
