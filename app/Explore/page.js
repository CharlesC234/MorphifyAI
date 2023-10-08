"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import ImageLayout from "@/components/ImageLayout";
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";


export default function Explore({categories, newDataArr}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [clickoff, setClickOff] = useState(false);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )


  return (
    <div class="max-sm:px-5" style={{ backgroundColor: "#000000" }}>

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
          class=" w-full flex overflow-x-scroll no-scrollbar py-3"
          style={{ backgroundColor: "#000000" }}
        >
          {categories.map((item, index) => {
            return (
              <li key={index} class="px-1 py-1 w-fit">
                <button  data-toggle="button" onClick={() => {router.push(pathname + '?' + createQueryString('sort', index)); 
                if(index != 0){setClickOff(true)}}} 
                style={{paddingLeft: 17.5, fontWeight: '700', paddingRight: 17.5, paddingBottom: 7.5, paddingTop: 7.5, borderRadius: 10}}
                class={`whitespace-nowrap flex hover:bg-zinc-700 active:bg-black focus:outline-none focus:text-black focus:bg-pink-500 
                ${index == 0 && !clickoff ? "bg-pink-500 text-black" : "bg-zinc-800 "}`}> {item}</button>
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
