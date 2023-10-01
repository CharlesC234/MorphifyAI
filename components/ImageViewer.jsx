import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function ImageLayout(data) {
  const images = data.allImages;
  const girls = images.dataArr;
  const length = girls.length;

  const [index, setIndex] = useState(data.index);

  useEffect(() => {
    console.log(index);
  }, [index]);

  function addIndex() {
    console.log("im running");
    if (index >= length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <a class="fixed z-10 left-0 top-0 h-full w-full overflow-hidden backdrop-blur-md">
      <div class=" grid grid-cols-6 items-center">
        <button
          onClick={() => addIndex()}
          class=" z-50 bg-gray-700 rounded-full p-3 mx-auto"
        >
          <FiArrowLeft size={55} />
        </button>

        <div
          onClick={() => data.setView(false)}
          class="col-span-4 xs:col-span-6"
        >
          <img
            class="max-h-fit w-auto rounded-lg m-8 mx-auto"
            src={"http://localhost:1337" + girls[index].image}
            alt=""
          />
        </div>

        <a
          onClick={() => addIndex()}
          class=" z-50 bg-gray-700 rounded-full p-3 mx-auto"
        >
          <FiArrowRight size={55} />
        </a>
      </div>
    </a>
  );
}
