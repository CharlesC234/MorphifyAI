"use client";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaDiscord } from "react-icons/fa6";
import { SiGumroad } from "react-icons/si";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { getUserDataStrapi } from "../../serverComponents/patreon";

export default function GeneratePopUp({fields}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString().slice(9);
    },
    [searchParams]
  );

  var makeArr = [];
  for (let i = 0; i < fields.length; i++) {
    makeArr.push({
      Field: fields[i].attributes.FieldName,
      Option: fields[i].attributes.Option[0].OptionTitle,
    });
  }
  const [selectedPost, setSelectedPost] = useState(makeArr.slice(-2));

  const [userData, setUserData] = useState({attributes: {Premium: false, Generations: 0}});
  const [generations, setGenerations] = useState(0);

  useEffect(() => {
    if (
      localStorage.getItem("AccessTokenDiscord") && localStorage.getItem("pid")
    ) {
      getUserDataStrapi(localStorage.getItem("pid")).then((res) => {
        if (res.data[0].attributes) {
          setUserData(res.data[0]);
          setGenerations(res.data[0].attributes.Generations)
        }
      });
    }
  }, []);


  var visible = searchParams.get("gen");

  const handleSignIn = async () => {
    await signIn("discord");
  };


  return (
    <>
    {visible ? 
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
                maxHeight: 1000,
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
                  Generate
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
              <div className="w-full flex content-center">
          <div>
        {fields.slice(-2).map((item, outerIndex) => {
          return (
            <div
            className="mt-0 ms-4"
              style={{ width: "85%", minWidth: 350 }}
              key={item.attributes.FieldName}
            >
              <h2 className="mt-4 text-xl font-medium" style={{ opacity: 0.8 }}>
                {item.attributes.FieldName}
              </h2>
              <div className="flex flex-wrap mt-4">
                {item.attributes.Option.map((itemInner, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        var temp = selectedPost;
                        for (let i = 0; i <= selectedPost.length; i++) {
                          if (i == outerIndex) {
                            temp[i].Option = itemInner.OptionTitle;
                          }
                          setSelectedPost(temp);
                          setRefresh(!refresh);
                        }
                      }}
                      data-toggle="button"
                      style={{
                        paddingLeft: 17.5,
                        fontWeight: "600",
                        paddingRight: 17.5,
                        paddingBottom: 7.5,
                        paddingTop: 7.5,
                        borderRadius: 8.5,
                      }}
                      className={`me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500
              ${
                selectedPost[outerIndex].Option == itemInner.OptionTitle
                  ? "fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
                  : "bg-transparent outline outline-2 outline-offset-0 outline-pink-500 text-pink-500"
              }`}
                    >
                      {itemInner.OptionTitle}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="ms-4 pb-2">
                {userData.attributes.Premium ? 
        <button
        //   onClick={() => generateImage()}
          className="btn text-xl py-4 px-5 mt-3 me-3 mb-3 rounded-lg whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
        >
          GENERATE NO PAYMENT
        </button>
        : <>
        {generations > 0 ?  <button
        //   onClick={() => {
        //     generateImage();
        //     fetch(process.env.API + `/api/discord-users/${userData.id}`, {
        //       method: "PUT",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({
        //         data: {
        //           Generations: generations - 1,
        //         },
        //       }),
        //     });
        //     setGenerations(generations - 1);
        //   }}
          className="btn text-xl py-4 px-5 mt-3 me-3 mb-3 rounded-lg whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
        >
          GENERATE NO PAYMENT
        </button>
        :
                <button
                className={`btn text-xl py-4 px-5 mt-3 me-3 mb-3 rounded-lg whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black`}
                onClick={() => {
                    router.replace(pathname + "?" + createQueryString("ee", true));
                }}
              >
                GENERATE
              </button>}</>
           }
           </div>
        </div>
        </div>
            </div>
          </div>
        </div>
        : <></>}
        </>
  );
}
