"use client";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function EnterEmail({emails}) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [buttonMsg, setButtonMsg] = useState("Subscribe");

    const createQueryString = useCallback(
        (name, value) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
      )

    console.log(searchParams.get("ee"));
    var visible = searchParams.get("ee");

    function handleEmailInput(e){
        if(e.target.value != userEmail && buttonDisabled){
            setButtonDisabled(false);
            setButtonMsg("Subscribe");
        }
        setUserEmail(e.target.value);
    }
    function handleButtonPress(){
        const emailsArr = emails;
        console.log(emails);
        if(userEmail != null && userEmail.length > 5){
        if(!emailsArr.includes(userEmail)){
            fetch('http://127.0.0.1:1337/api/emails?populate=*', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({data: {Email: userEmail}}),
              })
              emailsArr.push(userEmail);
              setButtonMsg("Subscribed");
              setButtonDisabled(true);
        }else{
        setButtonMsg("Already Subscribed");
        setButtonDisabled(true);
        }
        }
    }


    return <>{visible ? (
        <div
          style={{zIndex: 5}}
          data-te-modal-init
          data-te-backdrop="false"
          class="fixed left-0 top-0 z-10 h-full w-full overflow-x-hidden backdrop-blur-lg"
          id="exampleModalComponents"
          tabindex="-1"
          aria-labelledby="exampleModalComponentsLabel"
          aria-hidden="true">
          <div
            data-te-modal-dialog-ref
            class="w-auto h-auto mx-auto opacity-100 transition-all duration-300 ease-in-out max-w-[576px]">
            <div
            style={{borderRadius: 17.5, position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', bottom: '50%', left: '50%', right: '50%', maxHeight: 500, maxWidth: 500, height: 'fit-content'}}
              class="pb-1 min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto flex w-full h-full flex-col rounded-md border-none bg-clip-padding text-current shadow-lg outline-none bg-dark">
              <div
                class="flex flex-shrink-0 items-center justify-between rounded-t-md px-4">
                <h1
                  class="text-5xl font-semibold leading-normal text-neutral-800 dark:text-neutral-200 mt-3"
                  id="exampleModalComponentsLabel">
                  Enter Email
                </h1>
                <button
                  type="button"
                  class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  style={{marginTop: '1rem'}}
                  onClick={() => router.back()}
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
              <div style={{opacity: .85}} class="px-4 font-medium mt-3 h-auto pb-0 mb-4">
                Enter your email to stay up to date on updates and new models!
              </div>
              <div class="input-group mb-4">
              <input
              class="form-control ms-4 ps-3 py-2 fs-7 w-auto"
              type="search"
              placeholder="Enter Your Email"
              aria-label="Search"
              onBlur={handleEmailInput}
              style={{
                borderTopLeftRadius: 7.5,
                borderBottomLeftRadius: 7.5,
                fontWeight: '600',
                color: '#ffffff',
                backgroundColor: "rgba(255, 255, 255, .1)",
                borderWidth: 0,
              }}
            />
            <div class="input-group-append me-4">
                <button style={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderTopRightRadius: 7.5, borderBottomRightRadius: 7.5}} 
                onClick={handleButtonPress}
                disabled={buttonDisabled}
                class="px-3 border-transparent bg-pink-500 text-slate-800 text-s font-semibold py-2" type="button">{buttonMsg}</button>
             </div>
            </div>
            </div>
          </div>
        </div>
      ) : (<></>)}</>
}