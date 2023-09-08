"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR(
    "http://localhost:1337/api/models?populate=*",
    fetcher
  );

  if (data == undefined) {
    return <div style={{ backgroundColor: "#000000", height: 1000 }}></div>;
  }

  console.log(data);
  const dataArr = data.data.reverse();

  const categories = [
    "Latina",
    "White",
    "Black",
    "Arab",
    "Indian",
    "Asian",
    "Young",
    "Thick",
    "Skinny",
    "MILF",
  ];
  return (
    <div style={{ backgroundColor: "#000000" }}>
      <script
        src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"
        integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D"
        crossorigin="anonymous"
        async
      ></script>

      <div class="container" style={{ backgroundColor: "#000000" }}>
        <h5 class="mt-4 mb-2 ps-1 fw-bold" style={{ color: "#ffffff" }}>
          Categories:
        </h5>
        <ul
          class=" w-full flex overflow-x-scroll py-3"
          style={{ backgroundColor: "#000000" }}
        >
          {categories.map((item, index) => {
            return (
              <li key={index} class="px-3 py-2 bg-gray-700 mx-2 rounded-full">
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div class="container mt-4" style={{ backgroundColor: "#000000" }}>
        <div class="row ms-0" data-masonry='{"percentPosition": true }'>
          {dataArr.map((item, index) => {
            return (
              <>
                {dataArr[index].attributes.free_images.data.map(
                  (item, indexInner) => {
                    return (
                      <div
                        key={index}
                        style={{
                          width: "32.5%",
                          margin: 5,
                          padding: 0,
                        }}
                      >
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={
                            "#exampleModal" +
                            index.toString() +
                            indexInner.toString()
                          }
                          style={{
                            width: "100%",
                            borderRadius: 10,
                            backgroundColor: "#000000",
                            borderWidth: 0,
                            padding: 0,
                          }}
                        >
                          <img
                            class="img-thumbnail"
                            style={{
                              width: "100%",
                              borderRadius: 10,
                              backgroundColor: "#000000",
                              borderWidth: 0,
                              padding: 0,
                            }}
                            src={"http://localhost:1337" + item.attributes.url}
                            alt="Card image cap"
                          />
                        </button>
                        <div
                          class="modal modal-xl fade m-0"
                          style={{ backgroundColor: "rgba(0,0,0,0)" }}
                          id={
                            "exampleModal" +
                            index.toString() +
                            indexInner.toString()
                          }
                          tabindex="-1"
                          aria-labelledby={
                            "exampleModalLabel" +
                            index.toString() +
                            indexInner.toString()
                          }
                          aria-hidden="true"
                        >
                          <div
                            class="modal-dialog modal-fullscreen m-auto"
                            style={{
                              width: "100%",
                              backgroundColor: "rgba(0,0,0,0)",
                            }}
                          >
                            <div
                              class="modal-content m-auto"
                              style={{
                                borderRadius: 25,
                                backgroundColor: "rgba(0,0,0,0)",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  borderRadius: 25,
                                  width: "100%",
                                  height: "100%",
                                }}
                                id={
                                  "carouselExampleIndicators" +
                                  index.toString() +
                                  indexInner.toString()
                                }
                                class="carousel slide"
                              >
                                <div
                                  class="carousel-inner my-auto"
                                  style={{
                                    borderRadius: 25,
                                    width: "100%",
                                    height: "100%",
                                  }}
                                >
                                  {dataArr.map((item, indexTwo) => {
                                    return (
                                      <>
                                        {dataArr[
                                          indexTwo
                                        ].attributes.free_images.data.map(
                                          (item, indexInnerTwo) => {
                                            if (
                                              indexTwo == index &&
                                              indexInnerTwo == indexInner
                                            ) {
                                              return (
                                                <div
                                                  class="carousel-item active align-middle"
                                                  style={{
                                                    borderRadius: 25,
                                                    width: "100%",
                                                  }}
                                                  key={
                                                    indexTwo.toString() +
                                                    indexInnerTwo.toString()
                                                  }
                                                >
                                                  <div class="d-flex justify-content-center align-middle">
                                                    <div class="alert-trim m-auto">
                                                      <div
                                                        class="d-flex row ms-0 justify-content-between"
                                                        data-bs-theme="dark"
                                                      >
                                                        <a
                                                          class="row"
                                                          href={
                                                            "/" +
                                                            dataArr[indexTwo]
                                                              .attributes
                                                              .display_name
                                                          }
                                                          style={{
                                                            width: "80%",
                                                          }}
                                                        >
                                                          <img
                                                            class="mt-4 mb-3"
                                                            style={{
                                                              height: 65,
                                                              borderRadius:
                                                                "50%",
                                                              borderWidth: 0,
                                                              objectFit:
                                                                "cover",
                                                              width: 65,
                                                              padding: 0,
                                                            }}
                                                            src={
                                                              "http://localhost:1337" +
                                                              dataArr[indexTwo]
                                                                .attributes
                                                                .profile_pic
                                                                .data.attributes
                                                                .url
                                                            }
                                                            alt="Card image cap"
                                                          />
                                                          <h3
                                                            class="my-auto fw-bold ms-3"
                                                            style={{
                                                              width: "50%",
                                                            }}
                                                          >
                                                            {
                                                              dataArr[indexTwo]
                                                                .attributes
                                                                .display_name
                                                            }
                                                          </h3>
                                                        </a>
                                                        <button
                                                          type="button"
                                                          class="btn-close py-auto"
                                                          data-bs-dismiss="modal"
                                                          aria-label="Close"
                                                          style={{
                                                            height: 110,
                                                            width: 110,
                                                          }}
                                                        ></button>
                                                      </div>
                                                      <img
                                                        class="d-block img-fluid"
                                                        style={{
                                                          height: 835,
                                                          borderRadius: 20,
                                                          borderWidth: 0,
                                                          padding: 0,
                                                        }}
                                                        src={
                                                          "http://localhost:1337" +
                                                          item.attributes.url
                                                        }
                                                        alt="Card image cap"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            } else {
                                              return (
                                                <div
                                                  class="carousel-item align-middle"
                                                  style={{
                                                    borderRadius: 25,
                                                    width: "100%",
                                                  }}
                                                  key={
                                                    indexTwo.toString() +
                                                    indexInnerTwo.toString()
                                                  }
                                                >
                                                  <div class="d-flex justify-content-center align-middle">
                                                    <div class="alert-trim m-auto">
                                                      <div
                                                        class="d-flex row ms-0 justify-content-between "
                                                        data-bs-theme="dark"
                                                      >
                                                        <a
                                                          class="row"
                                                          href={
                                                            "/" +
                                                            dataArr[indexTwo]
                                                              .attributes
                                                              .display_name
                                                          }
                                                          style={{
                                                            width: "80%",
                                                          }}
                                                        >
                                                          <img
                                                            class="mt-4 mb-3"
                                                            style={{
                                                              height: 65,
                                                              borderRadius:
                                                                "50%",
                                                              borderWidth: 0,
                                                              objectFit:
                                                                "cover",
                                                              width: 65,
                                                              padding: 0,
                                                            }}
                                                            src={
                                                              "http://localhost:1337" +
                                                              dataArr[indexTwo]
                                                                .attributes
                                                                .profile_pic
                                                                .data.attributes
                                                                .url
                                                            }
                                                            alt="Card image cap"
                                                          />
                                                          <h3
                                                            class="my-auto fw-bold ms-3"
                                                            style={{
                                                              width: "50%",
                                                            }}
                                                          >
                                                            {
                                                              dataArr[indexTwo]
                                                                .attributes
                                                                .display_name
                                                            }
                                                          </h3>
                                                        </a>
                                                        <button
                                                          type="button"
                                                          class="btn-close py-auto"
                                                          data-bs-dismiss="modal"
                                                          aria-label="Close"
                                                          style={{
                                                            height: 110,
                                                            width: 110,
                                                          }}
                                                        ></button>
                                                      </div>

                                                      <img
                                                        class="d-block img-fluid"
                                                        style={{
                                                          height: 835,
                                                          borderRadius: 20,
                                                          borderWidth: 0,
                                                          padding: 0,
                                                        }}
                                                        src={
                                                          "http://localhost:1337" +
                                                          item.attributes.url
                                                        }
                                                        alt="Card image cap"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            }
                                          }
                                        )}
                                      </>
                                    );
                                  })}
                                </div>

                                <button
                                  class="carousel-control-prev"
                                  type="button"
                                  data-bs-target={
                                    "#carouselExampleIndicators" +
                                    index.toString() +
                                    indexInner.toString()
                                  }
                                  data-bs-slide="prev"
                                >
                                  <span
                                    class="carousel-control-prev-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span class="visually-hidden">Previous</span>
                                </button>
                                <button
                                  class="carousel-control-next"
                                  type="button"
                                  data-bs-target={
                                    "#carouselExampleIndicators" +
                                    index.toString() +
                                    indexInner.toString()
                                  }
                                  data-bs-slide="next"
                                >
                                  <span
                                    class="carousel-control-next-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span class="visually-hidden">Next</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            );
          })}
        </div>
      </div>

      <div style={{ height: 0, backgroundColor: "#000000" }} />
    </div>
  );
}
