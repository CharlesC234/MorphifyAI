"use client";
import "bootstrap/dist/css/bootstrap.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function Navbar({searchArr}) {

  const [showSearch, setShowSearch] = useState(false);
  const [border, setBorder] = useState(2);
  const [radius, setRadius] = useState(20);

  console.log(searchArr.length);
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

  return (
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg px-4 py-3">
      <div class="container">
        <a class="navbar-brand fw-bold" style={{ fontSize: 27.5 }} href="/">
          <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
            VirtualGirls.ai
          </h1>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mt-0 mb-lg-0 ms-5">
            <li class="nav-item px-2">
              <a href={"/"} 
              class={`nav-link font-bold hover:text-white ${pathname == "/" ? "text-white" : "text-stone-400"}`} aria-current="page">
                Explore
              </a>
            </li>
            <li class="nav-item px-2">
              <a href={"/models"} 
              class={`nav-link font-bold hover:text-white ${pathname == "/models" ? "text-white" : "text-stone-400"}`} aria-current="page">
                Models
              </a>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link font-bold hover:text-white text-stone-400" onClick={() => {router.push(pathname + '?' + createQueryString('ee', "true"))}} >
                Enter Email
              </a>
            </li>
            <li class="nav-item px-2">
              <a href={"/legal"}  class={`nav-link font-bold hover:text-white ${pathname == "/legal" ? "text-white" : "text-stone-400"}`}>
                Legal
              </a>
            </li>
          </ul>
          <div class="relative" style={{width: '40%'}}>
            <input
              class="form-control ps-4 font-bold text-md py-2 focus:bg-zinc-800 focus:border-zinc-700 bg-zinc-800 border-zinc-600 text-white"
              type="search"
              placeholder="Find models"
              onFocus={() => {setShowSearch(true); setRadius(0); setBorder(0)}}
              onBlur={() => {setShowSearch(false); setRadius(20); setBorder(2)}}
              onChange={(e) => {router.push(pathname + '?' + createQueryString('search', e.target.value))}}
              aria-label="Search"
              style={{
                borderWidth: 2,
                fontSize: 15,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: radius,
                borderBottomLeftRadius: radius,
                width: '100%',
              }}
            />
            <div class={`shadow-xl bg-zinc-800 position-absolute overflow-hidden border-zinc-700 mt-0 p-1 pt-3 ${showSearch ? "block" : "hidden"}`} 
            style={{borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 0}}>
              {searchArr.slice(0,3).map((item)=>{
                return <div className="row mb-3 px-3" style={{width: '100%'}}>
                  <div style={{width: '18%'}}>
                  <img
              alt="gallery"
              class="block rounded-lg object-cover object-center aspect-square"
              style={{borderRadius: '100%'}}
              src={"http://localhost:1337" +
              item.profile_pic} />
              </div>
              <h5 className="my-auto align-middle text-xl text-zinc-300" style={{fontWeight: 'bold', textAlign: 'left', width: '60%', alignSelf: 'center'}}>{item.display_name}</h5>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>


                </div>
              })}
              </div>
            </div>
        </div>
      </div>
    </nav>
  );
}
