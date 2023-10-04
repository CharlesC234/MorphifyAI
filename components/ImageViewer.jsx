import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {IoIosClose} from "react-icons/io"

export default function ImageLayout(data) {
  const images = data.allImages;
  const girls = images.dataArr;
  const length = girls.length;
  const router = useRouter();

  const [index, setIndex] = useState(data.index);

  function addIndex() {
    console.log("im running");
    if (index >= length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  return (
      <div class="grid grid-cols-3 items-center h-full w-full">
        <button
          onClick={() => addIndex()}
          class="z-50 rounded-full p-3 mx-auto"
          style={{backgroundColor: 'rgba(0,0,0,.2)'}}
        >
          <FiArrowLeft size={55}/>
        </button>

        <div
          class="h-full w-auto my-auto grid grid-rows-1 items-center"
        >
          <div class="w-fit mt-0">
            <div class="flex mb-0 mt-3">
            <a href={"/" + girls[index].display_name} class="ms-2 z-50 my-auto" style={{width: '18%', overflow: 'hidden'}}>
            <img
            class="block object-cover aspect-square"
            style={{borderRadius: "100%"}}
            src={"http://localhost:1337" + girls[index].image}
            alt=""
          />
          </a>
          <a href={"/" + girls[index].display_name} class="ms-2 z-50 ms-3 my-auto" style={{width: '80%'}}>
          <h1 class="text-3xl my-auto font-bold" style={{width: '100%'}}>{girls[index].display_name}</h1>
          </a>
          <button
          onClick={() => data.setView(false)}
          class="rounded-full z-50 me-3 mx-auto my-auto"
          style={{backgroundColor: 'rgba(0,0,0,.2)', padding: ".35rem"}}
        >
          <IoIosClose size={57.5}/>
        </button>
            </div>
            <div class="p-3 mt-1">
          <img
            class="h-fit w-auto my-auto"
            style={{borderRadius: 15}}
            src={"http://localhost:1337" + girls[index].image}
            alt=""
          />
          </div>
          </div>
          </div>

        <button
          onClick={() => addIndex()}
          class=" z-50 rounded-full p-3 mx-auto"
          style={{backgroundColor: 'rgba(0,0,0,.2)'}}
        >
          <FiArrowRight size={55} />
        </button>
      </div>
  );
}
