import { FiInstagram } from "react-icons/fi";
import {FaXTwitter} from "react-icons/fa6"
import {AiOutlineReddit} from "react-icons/ai"

export default function Footer() {
  return (
    <footer class="bg-inherit">
      <div class="container px-6 py-8 mx-auto">
        <hr class="my-10 border-gray-700" />
        <div class="flex flex-col items-center text-center">
          <a href="#">
            <h1 class="text-2xl mb-1 font-extrabold text-transparent bg-clip-text bg-pink-500">
              xpixels.io
            </h1>
            <p class="text-sm text-gray-500 text-left max-sm:text-center mt-1 max-sm:w-full">
            Generate Perfection.
          </p>
          </a>
        </div>

        <hr class="my-10 border-gray-700" />

        <div class="flex flex-col items-center sm:flex-row justify-between mb-10" style={{width: '100%'}}>
          <p class="text-sm text-gray-500 text-left max-sm:text-center mt-3 max-sm:w-full w-2/6">
            © Copyright 2023. All Rights Reserved.
          </p>


          <div class="flex flex-row justify-around sm:mt-0 mt-3 w-auto">
          <a class="mt-1" href={"https://www.instagram.com/xpixels.io"}> 
            <FiInstagram
                        size={30}
                        color={"rgb(236 72 153)"}
                        class="my-auto me-2"
                      /></a>
                      <a class="mt-1" href={"https://twitter.com/xpixels_io"}>
                        <FaXTwitter
                        size={30}
                        color={"rgb(236 72 153)"}
                        class="my-auto mx-2"
                      /></a>
                      <a href={"https://www.reddit.com/r/AIHaven"}>
                        <AiOutlineReddit
                        size={36.5}
                        color={"rgb(236 72 153)"}
                        class="my-auto ms-2"
                      /></a>
                      </div>
          

          <div class="flex mt-3 -mx-2 sm:mt-0 justify-center sm:justify-end max-sm:w-full w-2/6">
            <a
              href="legal"
              class="mx-2 text-sm text-gray-500 underline transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Legal TOS"
            >
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
