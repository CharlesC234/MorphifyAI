"use client";
import "bootstrap/dist/css/bootstrap.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function Navbar({ searchArr }) {
  const [showSearch, setShowSearch] = useState(false);
  const [border, setBorder] = useState(1.5);
  const [radius, setRadius] = useState(20);
  const [hidden, setHidden] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [inputStr, setInputStr] = useState("");

  //search
  function levenshteinDistance(a, b) {
    const matrix = Array.from(Array(b.length + 1), (_, i) => [i]);

    for (let i = 1; i <= a.length; i++) {
      matrix[0][i] = i;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // Deletion
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j - 1] + cost // Substitution
        );
      }
    }

    return matrix[b.length][a.length];
  }

  function sortByLevenshteinDistance(arr, strvalue) {
    const containsSubstring = (str, substr) =>
      str.toUpperCase().includes(substr.toUpperCase());

    return arr.sort((a, b) => {
      const containsA = containsSubstring(
        a.display_name.toUpperCase(),
        strvalue.toUpperCase()
      );
      const containsB = containsSubstring(
        b.display_name.toUpperCase(),
        strvalue.toUpperCase()
      );

      if (containsA && !containsB) return -1;
      if (!containsA && containsB) return 1;

      const distanceA = levenshteinDistance(
        a.display_name.toUpperCase(),
        strvalue.toUpperCase()
      );
      const distanceB = levenshteinDistance(
        b.display_name.toUpperCase(),
        strvalue.toUpperCase()
      );

      return distanceA - distanceB;
    });
  }

  var sortedArray = sortByLevenshteinDistance(searchArr, inputStr);

  return (
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg px-4 py-3 pb-3">
      <div class="container">
        <a class="navbar-brand fw-bold mb" style={{ fontSize: 27.5 }} href="/">
          <h1 class="text-6xl mb-1 font-extrabold text-transparent bg-clip-text bg-pink-500">
            xxxpixels
          </h1>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          onClick={() => {setHidden(!hidden)}}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class={`navbar-collapse mt-2 ${hidden ? "hidden" : ""}`}>
          <ul class="navbar-nav me-auto mt-0 mb-lg-0 md:ms-5 mb-2.5 md:mb-0">
            <li class="nav-item px-2">
              <a
                href={"/"}
                class={`nav-link max-sm:py-1 hover:text-pink-500 text-lg font-bold ${
                  pathname == "/"
                    ? "text-pink-500"
                    : "text-stone-300"
                }`}
                aria-current="page"
              >
                Explore
              </a>
            </li>
            <li class="nav-item px-2">
              <a
                href={"/models"}
                class={`nav-link max-sm:py-1 text-lg hover:text-pink-500 font-bold ${
                  pathname == "/models"
                    ? "text-pink-500"
                    : "text-stone-300"
                }`}
                aria-current="page"
              >
                Models
              </a>
            </li>
            <li class="nav-item px-2">
              <button
                class="nav-link max-sm:py-1 text-lg hover:text-white text-white font-bold "
                onClick={() => {
                  router.push(pathname + "?" + createQueryString("ee", "true"));
                }}
              >
                <h1 class="text-lg mb-1 font-bold text-transparent bg-clip-text bg-stone-300">
                  Early Access
                </h1>
              </button>
            </li>
          </ul>
          <div class="relative sm:w-100 md:w-5/12">
            <input
              class="form-control ps-4 py-2 font-bold text-md py-2 focus:bg-zinc-800 focus:border-zinc-700 bg-zinc-800 border-zinc-700 text-white"
              type="search"
              placeholder="Find models by name"
              onFocus={() => {
                setShowSearch(true);
                setRadius(0);
                setBorder(0);
              }}
              onChange={(e) => {
                setInputStr(e.target.value);
              }}
              aria-label="Search"
              style={{
                marginTop: "0rem",
                borderWidth: 1.5,
                fontSize: 15,
                height: 40,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: radius,
                borderBottomLeftRadius: radius,
                width: "100%",
              }}
            />
            <button
              onClick={() => {
                setShowSearch(false);
                setRadius(20);
                setBorder(1.5);
              }}
              className={`z-4 h-full w-full left-0 top-0 ${
                showSearch ? "fixed" : "hidden"
              }`}
            />
            <div
              class={`shadow-xl opacity-100 bg-zinc-800 position-absolute overflow-hidden border-zinc-700 mt-0 p-1 pt-3 pe-0 ${
                showSearch ? "block" : "hidden"
              }`}
              style={{
                borderLeftWidth: 1.5,
                borderRightWidth: 1.5,
                borderBottomWidth: 1.5,
                width: "100%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              {searchArr.slice(0, 4).map((item) => {
                return (
                  <a
                    className="row mb-3 px-3 pe-0"
                    style={{ width: "100%" }}
                    href={"/" + item.display_name}
                  >
                    <div style={{ width: "20%" }}>
                      <img
                        alt="gallery"
                        class="block rounded object-cover object-center aspect-square"
                        style={{ borderRadius: "100%" }}
                        src={"http://localhost:1337" + item.profile_pic}
                      />
                    </div>
                    <h5
                      className="my-auto align-middle text-xl text-zinc-300 pe-0 me-0"
                      style={{
                        fontWeight: "700",
                        textAlign: "left",
                        width: "60%",
                        alignSelf: "center",
                      }}
                    >
                      {item.display_name}
                    </h5>
                    <div
                      className="my-auto p-0"
                      style={{ width: "20%", alignContent: "end" }}
                    >
                      <FiArrowRight
                        size={30}
                        color={"rgb(236 72 153)"}
                        class="ms-4 my-auto"
                      />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
