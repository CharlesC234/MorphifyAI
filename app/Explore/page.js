"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import ImageLayout from "../../components/ImageLayout";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getUserDataStrapi } from "../../serverComponents/patreon";

export default function Explore({ categories, newDataArr, accessToken, pid, firstSignIn}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [clicked, setClicked] = useState(0);
  const [premium, setPremium] = useState(true);
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  if (pid) {
    localStorage.setItem("AccessTokenDiscord", accessToken);
    localStorage.setItem("pid", pid);
    if(firstSignIn){
      router.replace("/?wd=true");
    }else{
      router.replace("/");
    }
    }

    useEffect(() => {
      if(localStorage.getItem("pid") && localStorage.getItem("pid") != "null"){
        getUserDataStrapi(localStorage.getItem("pid")).then((res) => {
          if (res.data[0].attributes) {
            setPremium(res.data[0].attributes.Premium);
          }
        });
      }else{
        setPremium(false);
      }
    })

  return (
    <div className="max-sm:px-0" style={{ backgroundColor: "#000000" }}>
      <div className="container" style={{ backgroundColor: "#000000" }}>

        {premium ? <></> : 
        <>
                <iframe
                className="mt-5 mx-auto max-sm:hidden rounded"
                src="//a.magsrv.com/iframe.php?idzone=5100010&size=900x250"
                width="900"
                height="250"
              ></iframe>
              <iframe
                className="mt-4 mx-auto md:hidden rounded"
                src="//a.magsrv.com/iframe.php?idzone=5100030&size=300x100"
                width="300"
                height="100"
              ></iframe></>}

        <h4
          className="fw-bold ms-1"
          style={{
            color: "#ffffff",
            fontSize: "1.35rem",
            marginTop: "1.5rem",
            marginBottom: "0rem",
          }}
        >
          Categories:
        </h4>
        <ul
          className=" w-full flex overflow-auto no-scrollbar py-3"
          style={{ backgroundColor: "#000000" }}
        >
          {categories.map((item, index) => {
            return (
              <li
                key={index}
                className={`py-1 w-fit ${index == 0 ? "pe-1" : "px-1"}`}
              >
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
                  className={`whitespace-nowrap flex md:hover:bg-zinc-700
                ${clicked == index ? "bg-pink-500 text-black" : "bg-zinc-800"}`}
                >
                  {" "}
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="container mt-4" style={{ backgroundColor: "#000000" }}>
        <ImageLayout dataArr={newDataArr} premium={premium}/>
      </div>
    </div>
  );
}
