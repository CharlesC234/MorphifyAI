"use client";
import "bootstrap/dist/css/bootstrap.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function Navbar({searchArr}) {

  const [showSearch, setShowSearch] = useState(false);
  const [border, setBorder] = useState(2);
  const [radius, setRadius] = useState(20);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )


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
            matrix[i - 1][j] + 1,  // Deletion
            matrix[i][j - 1] + 1,  // Insertion
            matrix[i - 1][j - 1] + cost  // Substitution
          );
        }
      }
    
      return matrix[b.length][a.length];
    }
    
    function sortByLevenshteinDistance(arr, strvalue) {
      const containsSubstring = (str, substr) => str.toUpperCase().includes(substr.toUpperCase());
    
      return arr.sort((a, b) => {
        const containsA = containsSubstring(a.display_name.toUpperCase(), strvalue.toUpperCase());
        const containsB = containsSubstring(b.display_name.toUpperCase(), strvalue.toUpperCase());
    
        if (containsA && !containsB) return -1;
        if (!containsA && containsB) return 1;
    
        const distanceA = levenshteinDistance(a.display_name.toUpperCase(), strvalue.toUpperCase());
        const distanceB = levenshteinDistance(b.display_name.toUpperCase(), strvalue.toUpperCase());
    
        return distanceA - distanceB;
      });
    }

  var sortedArray = sortByLevenshteinDistance(searchArr, inputStr);

  return (
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg px-4 py-3 pb-3">
      <div class="container">
        <a class="navbar-brand fw-bold mb" style={{ fontSize: 27.5 }} href="/">
          <h1 class="text-5xl mb-1 font-extrabold text-transparent bg-clip-text bg-pink-500">
            xxxpixels
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
          <ul class="navbar-nav me-auto mt-1 mb-lg-0 ms-5">
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
              class="form-control ps-4 py-2 font-bold text-md py-2 focus:bg-zinc-800 focus:border-zinc-700 bg-zinc-800 border-zinc-700 text-white"
              type="search"
              placeholder="Find models by name"
              onFocus={() => {setShowSearch(true); setRadius(0); setBorder(0)}}
              onChange={(e) => {setInputStr(e.target.value)}}
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
            <button onClick={() => {setShowSearch(false); setRadius(20); setBorder(2)}} className={`z-4 h-full w-full left-0 top-0 ${showSearch ? "fixed" : "hidden"}`}/>
            <div class={`shadow-xl opacity-100 bg-zinc-800 position-absolute overflow-hidden border-zinc-700 mt-0 p-1 pt-3 pe-0 ${showSearch ? "block" : "hidden"}`} 
            style={{borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
              {searchArr.slice(0,3).map((item)=>{
                return <a className="row mb-3 px-3 pe-0" style={{width: '100%'}} href={"/" + item.display_name}>
                  <div style={{width: '19.5%'}}>
                  <img
              alt="gallery"
              class="block rounded-lg object-cover object-center aspect-square"
              style={{borderRadius: '100%'}}
              src={"http://localhost:1337" +
              item.profile_pic} />
              </div>
              <h5 className="my-auto align-middle text-xl text-zinc-300 pe-0 me-0" style={{fontWeight: '700', textAlign: 'left', width: '60%', alignSelf: 'center'}}>{item.display_name}</h5>
              <div className="my-auto" style={{width: '20%', alignContent: 'end'}}>
              <FiArrowRight size={30} color={"rgba(255, 255, 255, .8)"} />
              </div>
                </a>
              })}
              </div>
            </div>
        </div>
      </div>
    </nav>
  );
}
