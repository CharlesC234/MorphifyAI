"use client";
import Navbar from "@/components/layout/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import "../globals.css";
import { useEffect } from "react";
import ImageLayout from "@/components/ImageLayout";

export default function PerModel({newDataArr, modelIndex, data}) {

  const pathname = usePathname();
console.log("here " + JSON.stringify(newDataArr[0]));
    return (
      <div class="mt-0" style={{ backgroundColor: "#000000" }}>
        <img
                style={{
                  objectFit: "cover",
                  padding: 0,
                  borderWidth: 0,
                  height: 200, 
                  width: '100%',
                }}
                src={
                  "http://localhost:1337" + newDataArr[0].image
                }
                class="absolute object-cover blur-lg opacity-0  m-0 p-0"
                alt="..."
              />

        <div className="container content-center" style={{ baackgroundColor: "#000000" }}>
          <div className="grid grid-cols-1 mt-3 content-center">
            <button
              type="button"
              class="btn btn-primary mt-4 mx-auto"
              data-bs-toggle="modal"
              data-bs-target={"#exampleModal" + pathname.slice(1)}
              style={{
                backgroundColor: "#000000",
                borderRadius: '50%',
                width: 285,
                height: 285,
                borderWidth: 0,
                padding: 0,
              }}
            >
              <img
                style={{
                  width: 285,
                  height: 285,
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
            <div className="col h-fit mx-auto mt-4">
              <h1 class="w-fit mx-auto" style={{ fontSize: 35, fontWeight: "bold" }}>
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
      </div>
    );
}
