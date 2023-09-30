"use client";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect ,useState } from "react";

export default function Popup() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      let modal_status = localStorage.getItem('modal_status');
            if(!modal_status){
              setVisible(true);
              localStorage.setItem('modal_status',1);
            }
    }, []);
    return <>{visible ? (
        <div
          style={{zIndex: 5}}
          data-te-modal-init
          data-te-backdrop="false"
          class="fixed left-0 top-0 z-10 h-full w-full overflow-x-hidden backdrop-blur-md"
          id="exampleModalComponents"
          tabindex="-1"
          aria-labelledby="exampleModalComponentsLabel"
          aria-hidden="true">
          <div
            data-te-modal-dialog-ref
            class="w-auto h-auto mx-auto opacity-100 transition-all duration-300 ease-in-out max-w-[576px]">
            <div
            style={{borderRadius: 17.5, position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', bottom: '50%', left: '50%', right: '50%', maxHeight: 300, maxWidth: 500}}
              class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto flex w-full h-full flex-col rounded-md border-none bg-clip-padding text-current shadow-lg outline-none bg-dark">
              <div
                class="flex flex-shrink-0 items-center justify-between rounded-t-md px-4">
                <h1
                  class="text-4xl font-semibold leading-normal text-neutral-800 dark:text-neutral-200 mt-4"
                  id="exampleModalComponentsLabel">
                  18+ Content
                </h1>
                <button
                  type="button"
                  class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  style={{marginTop: '1rem'}}
                  onClick={() => setVisible(false)}
                  aria-label="Close">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-10 w-10">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="px-4 font-medium mt-4 h-auto pb-0 mb-4">
                Verify your age and enter your email to stay up to date
              </div>
              <input
              class="form-control ms-4 ps-3 me-4 py-2 fs-7 w-auto"
              type="search"
              placeholder="Enter Your Email"
              aria-label="Search"
              style={{
                borderRadius: 7.5,
                fontWeight: '600',
                color: '#ffffff',
                backgroundColor: "rgba(255, 255, 255, .1)",
                borderColor: "rgba(255, 255, 255, .15)",
                borderWidth: 2,
              }}
            />
              <div
                class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md p-4 mt-2">
                <button
                  type="button"
                  class="ml-1 text-lg font-semibold inline-block rounded bg-green-600 px-10 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  onClick={() => setVisible(false)}
                  data-te-ripple-color="light">
                  I am 18+
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (<></>)}</>
}