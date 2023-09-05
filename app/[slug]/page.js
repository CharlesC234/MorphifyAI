"use client";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { usePathname } from "next/navigation";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function modelPage() {
  const { data, error } = useSWR(
    "http://localhost:1337/api/models?populate=*",
    fetcher
  );

  const pathname = usePathname();
  const names = [];
  var pageExists = false;

  if (!data)
    return <div style={{ backgroundColor: "#000000", height: 1000 }}></div>;

  for (let i = 0; i < data.data.length; i++) {
    names.push(data.data[i].attributes.display_name);
  }
  console.log("names: " + names);
  console.log(pathname);

  for (let i = 0; i < names.length; i++) {
    if (pathname.toUpperCase() == "/" + names[i].toUpperCase()) {
      pageExists = true;
    }
  }

  if (pageExists) {
    return (
      <div style={{ backgroundColor: "#000000" }}>
        <Navbar />

        <div style={{ height: 1000 }} />
      </div>
    );
  } else {
    return (
      <div style={{ backgroundColor: "#000000", height: 1000 }}>
        <h1 class="pt-3 ps-3" style={{ color: "#ffffff" }}>
          404 - Page Not Found
        </h1>
      </div>
    );
  }
}
