"use client";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import "../globals.css";
import { useEffect } from "react";

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

  if (pageExists) {
    return (
      <div style={{ backgroundColor: "#000000" }}>
        <div className="container" style={{ baackgroundColor: "#000000" }}>
          <div className="row ms-1">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target={"#exampleModal" + pathname.slice(1)}
              style={{
                width: 500,
                borderRadius: 10,
                backgroundColor: "#000000",
                borderWidth: 0,
                padding: 0,
              }}
            >
              <img
                style={{
                  width: 500,
                  height: 500,
                  objectFit: "cover",
                  padding: 0,
                  borderWidth: 0,
                  borderRadius: 12.5,
                }}
                src={
                  "http://localhost:1337" +
                  data.data[modelIndex].attributes.profile_pic.data.attributes
                    .url
                }
                class="img-thumbnail mt-4"
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
