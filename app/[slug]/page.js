"use client";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import "../globals.css";
import { useEffect } from "react";
import ImageLayout from "@/components/ImageLayout";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function modelPage() {
  const { data, error } = useSWR(
    "http://localhost:1337/api/models?populate=*",
    fetcher
  );
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  const pathname = usePathname();
  const names = [];
  const newDataArr = [];
  var pageExists = false;
  var modelIndex;

  if (!data)
    return <div style={{ backgroundColor: "#000000", height: 1000 }}></div>;

  for (let i = 0; i < data.data.length; i++) {
    names.push(data.data[i].attributes.display_name);
  }

  for (let i = 0; i < names.length; i++) {
    if (pathname.toUpperCase() == "/" + names[i].toUpperCase()) {
      pageExists = true;
      modelIndex = i;
    }
  }

  for (
    let i = 0;
    i < data.data[modelIndex].attributes.free_images.data.length;
    i++
  ) {
    newDataArr.push({
      display_name: data.data[modelIndex].attributes.display_name,
      profile_pic:
        data.data[modelIndex].attributes.profile_pic.data.attributes.url,
      image:
        data.data[modelIndex].attributes.free_images.data[i].attributes.url,
    });
  }
  console.log(newDataArr);

  if (pageExists) {
    return (
      <div style={{ backgroundColor: "#000000" }}>
        <div className="container" style={{ baackgroundColor: "#000000" }}>
          <div className="row ms-2" style={{ marginTop: "2.5rem" }}>
            <button
              type="button"
              class="btn btn-primary d-inline-block mt-4"
              data-bs-toggle="modal"
              data-bs-target={"#exampleModal" + pathname.slice(1)}
              style={{
                backgroundColor: "#000000",
                width: 250,
                height: 250,
                borderWidth: 0,
                padding: 0,
              }}
            >
              <img
                style={{
                  width: 250,
                  height: 250,
                  objectFit: "cover",
                  padding: 0,
                  borderWidth: 0,
                  borderRadius: "50%",
                }}
                src={
                  "http://localhost:1337" +
                  data.data[modelIndex].attributes.profile_pic.data.attributes
                    .url
                }
                class="img-thumbnail"
                alt="..."
              />
            </button>
            <div
              class="modal modal-xl fade"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              id={"exampleModal" + pathname.slice(1)}
              tabindex="-1"
              aria-labelledby={"exampleModalLabel" + pathname.slice(1)}
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-xl"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0)",
                }}
              >
                <div
                  class="modal-content modal-xl"
                  style={{
                    borderRadius: 25,
                    width: "100%",
                    borderWidth: 0,
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0)",
                  }}
                >
                  <img
                    class="d-block img-fluid mx-auto"
                    style={{
                      height: 925,
                      borderRadius: 25,
                      borderWidth: 0,
                      padding: 0,
                    }}
                    src={
                      "http://localhost:1337" +
                      data.data[modelIndex].attributes.profile_pic.data
                        .attributes.url
                    }
                    alt="Card image cap"
                  />
                </div>
              </div>
            </div>
            <div className="col mt-5 ms-5">
              <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
                {pathname.slice(1)}
              </h1>
            </div>
          </div>
          <div
            class="container"
            style={{ backgroundColor: "#000000", marginTop: "4.5rem" }}
          >
            <ImageLayout dataArr={newDataArr} />
          </div>
        </div>
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
