import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

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
          class=" z-50 rounded-full p-3 mx-auto"
          style={{backgroundColor: 'rgba(0,0,0,.35)'}}
        >
          <FiArrowLeft size={55}/>
        </button>

        <div
          onClick={() => data.setView(false)}
          class="h-full w-auto my-auto grid grid-rows-1 items-center"
        >
          <img
            class="h-fit w-auto my-auto"
            style={{borderRadius: 20}}
            src={"http://localhost:1337" + girls[index].image}
            alt=""
          />
        </div>

        <button
          onClick={() => addIndex()}
          class=" z-50 rounded-full p-3 mx-auto"
          style={{backgroundColor: 'rgba(0,0,0,.35)'}}
        >
          <FiArrowRight size={55} />
        </button>
      </div>
  );
}
