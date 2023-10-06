export default function Footer() {
  return (
    <footer class="bg-inherit">
      <div class="container px-6 py-8 mx-auto">
        <hr class="my-10 border-gray-700" />
        <div class="flex flex-col items-center text-center">
          <a href="#">
            <h1 class="text-xl mb-1 font-extrabold text-transparent bg-clip-text bg-pink-500">
              xxxpixels
            </h1>
          </a>
        </div>

        <hr class="my-10 border-gray-700" />

        <div class="flex flex-col items-center sm:flex-row sm:justify-between">
          <p class="text-sm text-gray-500">
            © Copyright 2023. All Rights Reserved.
          </p>

          <div class="flex mt-3 -mx-2 sm:mt-0">
            <a
              href="legal"
              class="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
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
