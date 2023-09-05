import Image from "next/image";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Navbar from "@/components/Navbar";

async function getData() {
  const res = await fetch("http://localhost:1337/api/categories?populate=*", {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function Page() {
  const dataRaw = await getData();
  console.log(dataRaw);
  const dataArr = dataRaw.data.reverse();

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
      <Navbar />
      <div class="container" style={{ backgroundColor: "#000000" }}>
        <h5 class="mt-4 mb-2 ps-1 fw-bold" style={{ color: "#ffffff" }}>
          Categories:
        </h5>
        <ul
          class="list-group list-group-horizontal mt-3"
          style={{ backgroundColor: "#000000" }}
        >
          {categories.map((item, index) => {
            if (index == 0) {
              return (
                <li
                  class="list-group-item me-1 fw-bold"
                  style={{
                    borderRadius: 30,
                    fontSize: 16,
                    color: "rgba(255, 255, 255, .85)",
                    height: 35,
                    paddingLeft: 32.5,
                    paddingRight: 32.5,
                    borderWidth: 2,
                    paddingTop: 3,
                    paddingBottom: 0,
                    borderColor: "rgba(255, 255, 255, .075)",
                    backgroundColor: "rgba(255, 255, 255, .125)",
                  }}
                >
                  {item}
                </li>
              );
            } else if (index == categories.length) {
              return (
                <li
                  class="list-group-item ms-1 fw-bold"
                  style={{
                    borderRadius: 30,
                    fontSize: 16,
                    color: "rgba(255, 255, 255, .85)",
                    height: 35,
                    borderWidth: 2,
                    paddingLeft: 32.5,
                    paddingRight: 32.5,
                    borderWidth: 2,
                    paddingTop: 3,
                    paddingBottom: 0,
                    borderColor: "rgba(255, 255, 255, .075)",
                    backgroundColor: "rgba(255, 255, 255, .125)",
                  }}
                >
                  {item}
                </li>
              );
            } else {
              return (
                <li
                  class="list-group-item mx-1 fw-bold"
                  style={{
                    borderRadius: 30,
                    fontSize: 16,
                    color: "rgba(255, 255, 255, .85)",
                    height: 35,
                    paddingLeft: 32.5,
                    paddingRight: 32.5,
                    borderWidth: 2,
                    paddingTop: 3,
                    paddingBottom: 0,
                    borderColor: "rgba(255, 255, 255, .075)",
                    backgroundColor: "rgba(255, 255, 255, .125)",
                  }}
                >
                  {item}
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div class="container mt-4" style={{ backgroundColor: "#000000" }}>
        <div class="row ms-0">
          {dataArr.map((item, index) => {
            return (
              <>
                {dataArr[index].attributes.Images.data.map(
                  (item, indexInner) => {
                    return (
                      <div
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
                          class="modal modal-xl fade"
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
                                  class="carousel-inner"
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
                                        ].attributes.Images.data.map(
                                          (item, indexInnerTwo) => {
                                            if (
                                              indexTwo == index &&
                                              indexInnerTwo == indexInner
                                            ) {
                                              return (
                                                <div
                                                  class="carousel-item active"
                                                  style={{
                                                    borderRadius: 25,
                                                    width: "100%",
                                                  }}
                                                  key={
                                                    indexTwo.toString() +
                                                    indexInnerTwo.toString()
                                                  }
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
                                                      item.attributes.url
                                                    }
                                                    alt="Card image cap"
                                                  />
                                                </div>
                                              );
                                            } else {
                                              return (
                                                <div
                                                  class="carousel-item"
                                                  style={{
                                                    borderRadius: 25,
                                                    width: "100%",
                                                  }}
                                                  key={
                                                    indexTwo.toString() +
                                                    indexInnerTwo.toString()
                                                  }
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
                                                      item.attributes.url
                                                    }
                                                    alt="Card image cap"
                                                  />
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
