"use client";
import Image from "next/image";
import styles from "../app/page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "../app/globals.css";
import useSWR from "swr";

export default function ImageLayout(data) {
  var dataArr = data.dataArr;
  return (
    <div class="row ms-0" data-masonry='{"percentPosition": true }'>
      {dataArr.map((item, index) => {
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
              data-bs-target={"#exampleModal" + index.toString()}
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
                src={"http://localhost:1337" + item.image}
                alt="Card image cap"
              />
            </button>
            <div
              class="modal modal-xl fade m-0"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              id={"exampleModal" + index.toString()}
              tabindex="-1"
              aria-labelledby={"exampleModalLabel" + index.toString()}
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
                    id={"carouselExampleIndicators" + index.toString()}
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
                        if (indexTwo == index) {
                          return (
                            <div
                              class="carousel-item active align-middle"
                              style={{
                                borderRadius: 25,
                                width: "100%",
                              }}
                              key={indexTwo.toString()}
                            >
                              <div class="d-flex justify-content-center align-middle">
                                <div class="alert-trim m-auto">
                                  <div
                                    class="d-flex row ms-0 justify-content-between"
                                    data-bs-theme="dark"
                                  >
                                    <a
                                      class="row"
                                      href={"/" + item.display_name}
                                      style={{
                                        width: "80%",
                                      }}
                                    >
                                      <img
                                        class="mt-4 mb-3"
                                        style={{
                                          height: 65,
                                          borderRadius: "50%",
                                          borderWidth: 0,
                                          objectFit: "cover",
                                          width: 65,
                                          padding: 0,
                                        }}
                                        src={
                                          "http://localhost:1337" +
                                          item.profile_pic
                                        }
                                        alt="Card image cap"
                                      />
                                      <h3
                                        class="my-auto fw-bold ms-3"
                                        style={{
                                          fontSize: "1.75rem",
                                          width: "50%",
                                        }}
                                      >
                                        {item.display_name}
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
                                      height: "52rem",
                                      borderRadius: 20,
                                      borderWidth: 0,
                                      padding: 0,
                                    }}
                                    src={"http://localhost:1337" + item.image}
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
                              key={indexTwo.toString()}
                            >
                              <div class="d-flex justify-content-center align-middle">
                                <div class="alert-trim m-auto">
                                  <div
                                    class="d-flex row ms-0 justify-content-between "
                                    data-bs-theme="dark"
                                  >
                                    <a
                                      class="row"
                                      href={"/" + item.display_name}
                                      style={{
                                        width: "80%",
                                      }}
                                    >
                                      <img
                                        class="mt-4 mb-3"
                                        style={{
                                          height: 65,
                                          borderRadius: "50%",
                                          borderWidth: 0,
                                          objectFit: "cover",
                                          width: 65,
                                          padding: 0,
                                        }}
                                        src={
                                          "http://localhost:1337" +
                                          item.profile_pic
                                        }
                                        alt="Card image cap"
                                      />
                                      <h3
                                        class="my-auto fw-bold ms-3"
                                        style={{
                                          fontSize: "1.75rem",
                                          fontSize: 25,
                                          width: "50%",
                                        }}
                                      >
                                        {item.display_name}
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
                                      height: "52rem",
                                      borderRadius: 20,
                                      borderWidth: 0,
                                      padding: 0,
                                    }}
                                    src={"http://localhost:1337" + item.image}
                                    alt="Card image cap"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>

                    <button
                      class="carousel-control-prev"
                      type="button"
                      data-bs-target={
                        "#carouselExampleIndicators" + index.toString()
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
                        "#carouselExampleIndicators" + index.toString()
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
      })}
      <div />
    </div>
  );
}
