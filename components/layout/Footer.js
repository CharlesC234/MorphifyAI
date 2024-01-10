export default function Footer() {
  return (
    <footer className="bg-inherit">
      <div className="container px-6 py-8 mx-auto">
        <hr className="my-10 border-gray-700" />
        <div className="flex flex-col items-center text-center">
          <a href="#">
            <h1 className="text-xl mb-1 font-extrabold text-transparent bg-clip-text bg-pink-500">
              xpixels.io
            </h1>
          </a>
        </div>

        <hr className="my-10 border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between mb-10">
          <p className="text-sm text-gray-500">
            © Copyright 2023. All Rights Reserved.
          </p>

          <div className="flex mt-3 -mx-2 sm:mt-0">
            <a
              href="legal"
              className="mx-2 text-sm text-gray-500 underline transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
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
