"use client";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaDiscord } from "react-icons/fa6";
import { SiGumroad } from "react-icons/si";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function Paywall({ emails }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [buttonMsg, setButtonMsg] = useState("Subscribe");

  var visible = searchParams.get("ee");

  const handleSignIn = async () => {
    await signIn("discord");
  };

  return (
    <>
      {visible ? (
        <>
        {localStorage.getItem("AccessTokenDiscord") != "null" && localStorage.getItem("pid") != "null" ? 
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
                  className="text-5xl font-semibold leading-normal text-neutral-800 dark:text-neutral-200 mt-3"
                  id="exampleModalComponentsLabel"
                >
                  Premium
                </h1>
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  style={{ marginTop: "1rem" }}
                  onClick={() => router.back()}
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
                <h2 className="font-medium text-md ms-1">Looks like you're out of generations!</h2>
                <ul className="list-disc ml-4 mt-3">
                  <li className="font-medium text-md ms-1">
                    Please use the button below to purchase a $10 membership for unlimited generations and other perks in order to continue
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0 flex-wrap items-center justify-start rounded-b-md px-4 pb-4 pt-0 mt-0">
                <script src="https://gumroad.com/js/gumroad.js"></script>
              <a className="ml-1 flex text-xl font-semibold inline-block rounded bg-pink-500 ps-3 pe-0 pb-2 pt-2.5 leading-normal text-slate-800" 
              href="https://xpixels.gumroad.com/l/ppski">
                <SiGumroad className="me-3 ms-0 mt-1" size={24} />
                Purchase a Membership on Gumroad</a>
              </div>
            </div>
          </div>
        </div>
        :
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
                className="text-5xl font-semibold leading-normal text-neutral-800 dark:text-neutral-200 mt-3"
                id="exampleModalComponentsLabel"
              >
                Premium
              </h1>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                style={{ marginTop: "1rem" }}
                onClick={() => router.back()}
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
              <h2 className="font-medium text-md ms-1">Looks like you have discovered a premium feature!</h2>
              <ul className="list-disc ml-4 mt-3">
                <li className="font-medium text-md ms-1">
                  Please sign in with discord to redeem a free generation or to purchase a membership for unlimited generations and other perks!
                </li>
              </ul>
            </div>
            <div className="flex-shrink-0 flex-wrap items-center justify-start rounded-b-md px-4 pb-4 pt-0 mt-0">
              <button
                type="button"
                className="ml-1 flex text-xl font-semibold inline-block rounded bg-pink-500 ps-3 pe-4 pb-2 pt-2.5 leading-normal text-slate-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                onClick={() => handleSignIn()}
                data-te-ripple-color="light"
              >
                <FaDiscord className="me-3 ms-0 mt-1" size={24} />
                Sign In For A Free Generation
              </button>
            </div>
          </div>
        </div>
      </div>
      }
      </>
      ) : (
        <></>
      )}
    </>
  );
}
