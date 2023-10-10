import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowDown,
  FiArrowUp,
} from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

export default function ImageLayout(data) {
  const images = data.allImages;
  const girls = images.dataArr;
  const length = girls.length;
  const [index, setIndex] = useState(data.index);
  const [focused, setFocused] = useState(false);
  const [upvotes, setupvotes] = useState(girls[index].upvotes);
  const [downvotes, setdownvotes] = useState(girls[index].downvotes);
  const [change, setChange] = useState(false);
  const [upvoted, setupvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setupvotes(girls[index].upvotes);
    setdownvotes(girls[index].downvotes);
    setChange(false);
  }, [index]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function addIndex() {
    if (index >= length - 1) {
      setIndex(0);
      setupvoted(false);
      setDownvoted(false);
      if (change) {
        router.push(pathname + "?" + createQueryString("revalidate", [!searchParams.get("revalidate") ? 0 : [searchParams.get("revalidate") == 1 ? 0 : 1]]));
      }
    } else {
      setIndex(index + 1);
      setupvoted(false);
      setDownvoted(false);
      if (change) {
        router.push(pathname + "?" + createQueryString("revalidate", [!searchParams.get("revalidate") ? 0 : [searchParams.get("revalidate") == 1 ? 0 : 1]]));
      }
    }
  }

  function subtractIndex() {
    if (index <= 0) {
      setIndex(length - 1);
      setupvoted(false);
      setDownvoted(false);
      if (change) {
        router.push(pathname + "?" + createQueryString("revalidate", [!searchParams.get("revalidate") ? 0 : [searchParams.get("revalidate") == 1 ? 0 : 1]]));
      }
    } else {
      setIndex(index - 1);
      setupvoted(false);
      setDownvoted(false);
      if (change) {
        router.push(pathname + "?" + createQueryString("revalidate", [!searchParams.get("revalidate") ? 0 : [searchParams.get("revalidate") == 1 ? 0 : 1]]));
      }
    }
  }

  return (
    <div class="grid grid-cols-3 max-sm:grid-cols-2 items-center h-full w-full">
      <button
        onClick={() => subtractIndex()}
        class={`z-40 max-sm:h-full max-sm:w-full max-sm:opacity-0 rounded-full p-3 mx-auto ${
          focused ? "opacity-0" : "md:opacity-100"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,.2)" }}
      >
        <FiArrowLeft size={55} />
      </button>

      <div
        class={`relative h-fit w-fit mx-auto my-auto grid grid-rows-1 items-center max-sm:absolute max-sm:p-0 ${
          focused ? "md:p-0" : "2xl:p-10"
        }`}
      >
        <div class="w-fit mt-0">
          <div class={`flex mb-0 mt-3 ${focused ? "hidden" : ""}`}>
            <a
              href={"/" + girls[index].display_name}
              class="md:ms-2 z-50 my-auto md:w-20 max-sm:w-24 max-sm:ms-4"
              style={{ overflow: "hidden" }}
            >
              <img
                class="block object-cover aspect-square"
                style={{ borderRadius: "100%" }}
                src={process.env.API + girls[index].profile_pic}
                alt=""
              />
            </a>
            <a
              href={"/" + girls[index].display_name}
              class="ms-2 z-50 ms-3 my-auto"
              style={{ width: "80%" }}
            >
              <h1 class="text-3xl my-auto font-bold" style={{ width: "100%" }}>
                {girls[index].display_name}
              </h1>
            </a>
            <button
              onClick={() => {
                data.setView(false);
                if (change) {
                  router.push(pathname + "?" + createQueryString("revalidate", [!searchParams.get("revalidate") ? 0 : [searchParams.get("revalidate") == 1 ? 0 : 1]]));
                }
              }}
              class="rounded-full z-50 me-3 mx-auto my-auto"
              style={{ backgroundColor: "rgba(0,0,0,.2)", padding: ".35rem" }}
            >
              <IoIosClose size={57.5} />
            </button>
          </div>
          <div
            class={`relative mt-1 overflow-hidden ${focused ? "p-0" : "p-3"}`}
          >
            <a onClick={() => setFocused(!focused)}>
              <img
                class="h-auto w-auto my-auto"
                style={{ borderRadius: 15 }}
                src={process.env.API + girls[index].image}
                alt=""
              />
            </a>
            <div
              class={`absolute flex w-fit mb-3 pe-4 ${
                focused ? "opacity-0" : "opacity-100"
              }`}
              style={{
                position: "absolute",
                bottom: 0,
                backgroundColor: "rgba(0,0,0,.2)",
                borderBottomLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
            >
              <button
                onClick={() => {
                  if (upvoted) {
                    fetch(
                      process.env.API + "/api/posts/" + girls[index].postid,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          data: { upvotes: upvotes - 1 },
                        }),
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                      })
                      .catch((error) => {
                        console.error("Error updating model:", error);
                      });
                    setupvotes(upvotes - 1);
                    setupvoted(false);
                  } else {
                    fetch(
                      process.env.API + "/api/posts/" + girls[index].postid,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          data: { upvotes: upvotes + 1 },
                        }),
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                      })
                      .catch((error) => {
                        console.error("Error updating model:", error);
                      });
                    setupvotes(upvotes + 1);
                    setupvoted(true);
                    setChange(true);
                  }
                }}
                class={`z-50 p-3 mx-auto`}
              >
                <FiArrowUp
                  size={27.5}
                  color={upvoted ? "rgb(236 72 153)" : "rgb(255, 255, 255)"}
                />
              </button>
              <h1 class="my-auto font-semibold">{upvotes}</h1>
              <button
                onClick={() => {
                  if (downvoted) {
                    fetch(
                      process.env.API + "/api/posts/" + girls[index].postid,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          data: { downvotes: downvotes - 1 },
                        }),
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                      })
                      .catch((error) => {
                        console.error("Error updating model:", error);
                      });
                    setdownvotes(downvotes - 1);
                    setDownvoted(false);
                  } else {
                    fetch(
                      process.env.API + "/api/posts/" + girls[index].postid,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          data: { downvotes: downvotes + 1 },
                        }),
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                      })
                      .catch((error) => {
                        console.error("Error updating model:", error);
                      });
                    setdownvotes(downvotes + 1);
                    setDownvoted(true);
                    setChange(true);
                  }
                }}
                class="z-50 p-3 mx-auto"
              >
                <FiArrowDown
                  size={27.5}
                  color={downvoted ? "rgb(236 72 153)" : "rgb(255,255,255)"}
                />
              </button>
              <h1 class="my-auto font-semibold">{downvotes}</h1>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => addIndex()}
        class={`z-40 max-sm:h-full max-sm:opacity-0 max-sm:w-full rounded-full p-3 mx-auto ${
          focused ? "opacity-0" : "md:opacity-100"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,.2)" }}
      >
        <FiArrowRight size={55} />
      </button>
    </div>
  );
}
