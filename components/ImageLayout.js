"use client";
import styles from "../app/page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "../app/globals.css";
import useSWR from "swr";
import { useState, useEffect } from "react";
import ImageViewer from "@/components/ImageViewer";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function ImageLayout(data) {
  var dataArr = data.dataArr;

  const [photoView, setPhotoView] = useState(false);
  const [selectedIndex, setIndex] = useState(1);
  const [close, setClose] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [numImages, setNumImages] = useState(16);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function selectPhoto(index) {
    setIndex(index);
    setPhotoView(true);
  }
  
    useEffect(() => {
      const handleScroll = () => {
        const offsetHeight = document.documentElement.offsetHeight;
        const innerHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
  
        const hasReachedBottom = offsetHeight - (innerHeight + scrollTop) <= 5;

        if(hasReachedBottom){
        setNumImages(numImages + 16);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    if(numImages > 16){
      setTimeout(() => {
      const handleScroll = () => {
        const offsetHeight = document.documentElement.offsetHeight;
        const innerHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
  
        const hasReachedBottom = offsetHeight - (innerHeight + scrollTop) <= 5;

        if(hasReachedBottom){
        setNumImages(numImages + 16);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, 1000)
    }

  return (
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      {dataArr.slice(0, numImages).map((item, index) => {
        return (
          <a
            onClick={() => {
              selectPhoto(index);
            }}
            key={index}
            class="grid gap-4 cursor-pointer"
          >
            <img
              loading="lazy"
              class="h-auto max-w-full rounded-lg"
              src={process.env.API + item.image}
            />
          </a>
        );
      })}
      {photoView ? (
        <div class="fixed z-10 left-0 top-0 h-full w-full overflow-hidden backdrop-blur-lg">
          <button
            class="fixed z-4 h-full w-full"
            onClick={() => {
              setPhotoView(false);
              router.refresh();
            }}
          />
          <ImageViewer
            allImages={data}
            setView={setPhotoView}
            index={selectedIndex}
          />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
