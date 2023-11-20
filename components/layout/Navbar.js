"use client";
import "bootstrap/dist/css/bootstrap.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import {IoPersonCircle} from "react-icons/io5"
import { getUserData, getUserDataStrapi } from "../../serverComponents/patreon";

export default function Navbar({ searchArr }) {

  const [showSearch, setShowSearch] = useState(false);
  const [border, setBorder] = useState(1.5);
  const [radius, setRadius] = useState(20);
  const [hidden, setHidden] = useState(true);
  const [dropdown, setdropdown] = useState(false);
  const [userData, setUserData] = useState({attributes: {First_Name: "premium"}});

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSignIn = async () => {
    await signIn("patreon");
  };

  const handleSignOut = async () => {
    localStorage.setItem("Token", null);
    setUserData(null)
  }

  useEffect(() => {
    if(localStorage.getItem('Token') && localStorage.getItem('Token') != null){
    getUserDataStrapi(localStorage.getItem('Token')).then((res) => {
      setUserData(res.data[0]);
    });
    }
  })

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
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg px-0 py-3 pb-3">
      <div class="container">
        <a
          class="navbar-brand fw-bold me-10"
          style={{ fontSize: 27.5 }}
          href="/"
        >
          <h1 class="text-6xl mb-1 font-extrabold text-transparent bg-clip-text bg-pink-500">
            xpixels
          </h1>
        </a>
        <button
          class="navbar-toggler outline outline-2"
          type="button"
          onClick={() => {
            setHidden(!hidden);
          }}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class={`navbar-collapse mt-2 ${hidden ? "hidden" : ""}`}>
          <ul class="navbar-nav me-auto mt-0 mb-lg-0 md:ms-5 mb-2.5 md:mb-0">
            <li class="nav-item px-1">
              <a
                href={"/"}
                class={`nav-link max-sm:py-0.5 hover:text-pink-500 text-lg font-semibold ${
                  pathname == "/" ? "text-pink-500" : "text-white opacity-75"
                }`}
                aria-current="page"
              >
                Explore
              </a>
            </li>
            <li class="nav-item px-1">
              <a
                href={"/models"}
                class={`nav-link max-sm:py-0.5 text-lg hover:text-pink-500 font-semibold ${
                  pathname == "/models" ||
                  (pathname != "/" && pathname != "/legal" && pathname != "/generate")
                    ? "text-pink-500"
                    : "text-white opacity-75"
                }`}
                aria-current="page"
              >
                Models
              </a>
            </li>
            <li class="nav-item px-1">
              <a
                href={"/generate"}
                class={`nav-link max-sm:py-1 text-lg hover:text-pink-500 font-semibold ${
                  pathname == "/generate" 
                    ? "text-pink-500"
                    : "text-white opacity-75"
                }`}
                aria-current="page"
              >
                Generate
              </a>
            </li>
            {/* <li class="nav-item px-1">
              <button
                class="nav-link max-sm:py-1 text-lg hover:text-pink-500 text-white font-semibold opacity-85"
                onClick={() => handlePremium()}
              >
                <h1 class="text-lg mb-1 text-transparent bg-clip-text bg-white">
                  Premium
                </h1>
              </button>
            </li> */}
          </ul>
          <div
            class="relative sm:w-100 md:w-5/12 max-sm:mt-3" 
            style={{ marginBottom: ".25rem" }}
          >
            <input
              class="form-control ps-4 py-2 me-2 font-semibold text-md py-2 focus:bg-zinc-800 focus:border-zinc-600 bg-zinc-800 border-zinc-600 text-white"
              type="search"
              placeholder="Search models by name"
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
                borderWidth: 2,
                fontSize: 16,
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
              class={`z-50 shadow-xl opacity-100 bg-zinc-800 position-absolute overflow-hidden border-zinc-600 p-1 pt-3 pe-0 ${
                showSearch ? "block" : "hidden"
              }`}
              style={{
                borderLeftWidth: 2,
                borderRightWidth: 2,
                borderBottomWidth: 2,
                width: "100%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              {searchArr.slice(0, 4).map((item, index) => {
                return (
                  <a
                    key={index}
                    className="row mb-3 px-3 pe-0"
                    style={{ width: "100%" }}
                    href={"/" + item.display_name}
                  >
                    <div style={{ width: "18%", maxWidth: 85, minWidth: 65 }}>
                      <img
                        alt="gallery"
                        class="block rounded object-cover object-center aspect-square my-auto"
                        style={{ borderRadius: "100%" }}
                        src={process.env.API + item.profile_pic}
                      />
                    </div>
                    <h5
                      className="my-auto font-bold align-middle text-xl text-zinc-300 pe-0 me-0"
                      style={{
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
          <button
                onClick={() => setdropdown(!dropdown)}
                class="nav-link flex max-sm:py-1 text-lg hover:text-pink-500 text-white font-semibold opacity-85 mb-1.5 ml-4 max-sm:ml-0 max-sm:mb-0 max-sm:mt-2"
              >
                <IoPersonCircle
                size={42}
                color={"rgb(236 72 153)"}
                />
                <div class="my-auto">
              <h5 class="text-lg font-semibold ml-2 opacity-75">{userData.attributes.First_Name} {userData.attributes.Last_Name}</h5>
              </div>
              </button>
              <div id="dropdown" class={`max-sm:w-11/12 absolute md:mt-2 max-sm:mt-3 top-100 max-sm:left-0 max-sm:right-100 ms-3 right-0 z-5 divide-y divide-gray-100 rounded-lg shadow w-60 ${dropdown ? "" : "hidden"}`}
              style={{backgroundColor: 'rgba(33,37,41)', marginRight: '7.5rem'}}>
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                  <button onClick={() => {handleSignIn()}} class={`w-100 text-left font-bold block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white 
                  ${userData ? "hidden" : ""}`}>Sign In</button>
                </li>
                <li>
                  <button onClick={() => {handleSignIn()}} class={`w-100 text-left font-bold block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white 
                  ${userData ? "hidden" : ""}`}>Create Account</button>
                </li>
              <li>
              <a
                href={"https://www.patreon.com/xpixels/membership"}
                class={`font-bold block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-100 text-left ${userData ? "" : "hidden"}`}>Manage Subscriptions</a>
                <button
                class={`font-bold block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-100 text-left ${userData ? "hidden" : ""}`}
                 onClick={() => {router.push(
                  pathname + "?" + createQueryString("ee", true)
                )}}>Manage Subscriptions</button>
                </li>
                <li>
                  <a href={"/models"} class={`w-100 text-left font-bold block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white 
                  ${userData ? "" : "hidden"}`}>My Models</a>
                </li>
                <li>
                  <button onClick={() => {handleSignOut()}} class={`w-100 text-left font-bold block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white 
                  ${userData ? "" : "hidden"}`}>Sign out</button>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
