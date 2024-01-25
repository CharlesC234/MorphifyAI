"use client";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaDiscord } from "react-icons/fa6";
import { SiGumroad } from "react-icons/si";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function WelcomeDiscord({ emails }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [buttonMsg, setButtonMsg] = useState("Subscribe");

  var visible = searchParams.get("wd");


  return (
    <>
      {visible ? (
        <div
          style={{ zIndex: 5 }}
          data-te-modal-init
          data-te-backdrop="false"
          className="fixed left-0 top-0 z-10 h-full w-full overflow-x-hidden backdrop-blur-lg"
          id="exampleModalComponents"
          tabindex="-1"
          aria-labelledby="exampleModalComponentsLabel"
          aria-hidden="true"
        >
          <div
            data-te-modal-dialog-ref
            className="w-auto h-auto mx-auto opacity-100 transition-all duration-300 ease-in-out max-w-[576px]"
          >
            <div
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                bottom: "50%",
                left: "50%",
                right: "50%",
                maxHeight: 500,
                maxWidth: 500,
                height: "fit-content",
              }}
              className="pb-1 min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto flex w-full h-full flex-col md:rounded-2xl max-sm:rounded-none border-none bg-clip-padding text-current shadow-lg outline-none bg-dark"
            >
              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md px-4">
                <h1
                  className="text-3xl font-semibold leading-normal text-neutral-800 dark:text-neutral-200 mt-3"
                  id="exampleModalComponentsLabel"
                >
                  Welcome {localStorage.getItem("UserNameDiscord")}!
                </h1>
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  style={{ marginTop: "1rem" }}
                  onClick={() => router.replace("/")}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-10 w-10"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div
                style={{ opacity: 0.85 }}
                className="px-4 font-medium mt-2 h-auto pb-0 mb-4"
              >
                <h2 className="font-medium text-md ms-1 mt-2">Thanks for signing in! You have 1 free generation</h2>
                <ul className="list-disc ml-4 mt-3">
                  <li className="font-medium text-sm ms-1">
                    Use your generation to get up to 35 images of one of our premade models by going to a models page and selecting your options
                  </li>
                  <li className="font-medium text-sm ms-1 mt-1">
                    Use your generation to create your own custom model based on your preferances!
                  </li>
                  <li className="font-medium text-sm ms-1 mt-1">
                    Become a member for $10 a month to get unlimited generations, no ads, access to exclusive models, and much more
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 flex-wrap items-center justify-start rounded-b-md px-4 pb-4 pt-0 mt-0">
              <button className="ml-1 pe-4 mb-2 flex text-xl font-semibold inline-block rounded bg-pink-500 ps-3 pe-0 pb-2 pt-2.5 leading-normal text-slate-800" 
               onClick={() => router.push("/generate")}>Generate a Custom Model</button>
                <script src="https://gumroad.com/js/gumroad.js"></script>
              <button className="ml-1 pe-4 flex text-xl font-semibold inline-block rounded bg-pink-500 ps-3 pe-0 pb-2 pt-2.5 leading-normal text-slate-800" 
               onClick={() => router.replace("https://xpixels.gumroad.com/l/ppski")}>
                <SiGumroad className="me-3 ms-0 mt-1" size={24} />
                Purchase a Membership on Gumroad</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}