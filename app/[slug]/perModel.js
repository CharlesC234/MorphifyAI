"use client";
import "bootstrap/dist/css/bootstrap.css";
import { usePathname } from "next/navigation";
import "../globals.css";
import ImageLayout from "../../components/ImageLayout";

export default function PerModel({ newDataArr, modelIndex, data }) {
  const pathname = usePathname();
  return (
    <div class="mt-0" style={{ backgroundColor: "#000000" }}>
            <iframe class="mt-4 mx-auto max-sm:hidden rounded" src="//a.magsrv.com/iframe.php?idzone=5100010&size=900x250" width="900" height="250" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
      <iframe class="mt-4 mx-auto md:hidden rounded" src="//a.magsrv.com/iframe.php?idzone=5100030&size=300x100" width="300" height="100" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
      <img
        style={{
          objectFit: "cover",
          padding: 0,
          borderWidth: 0,
          height: 200,
          width: "100%",
        }}
        src={process.env.API + newDataArr[0].image}
        class="absolute object-cover blur-lg opacity-0  m-0 p-0"
        alt="..."
      />

      <div
        className="container content-center"
        style={{ baackgroundColor: "#000000" }}
      >
        <div className="grid grid-cols-1 mt-3 content-center">
          <button
            type="button"
            class="btn btn-primary mt-4 mx-auto aspect-square"
            data-bs-toggle="modal"
            data-bs-target={"#exampleModal" + pathname.slice(1)}
            style={{
              backgroundColor: "#000000",
              borderRadius: "100%",
              width: "25%",
              minWidth: 250,
              height: "auto",
              borderWidth: 0,
              padding: 0,
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                padding: 0,
                borderWidth: 0,
                borderRadius: "100%",
              }}
              src={
                process.env.API +
                data.data[modelIndex].attributes.profile_pic.data.attributes.url
              }
              class="img-thumbnail aspect-square"
              alt="..."
            />
          </button>
          <div className="col h-fit mx-auto mt-4">
            <h1
              class="w-fit mx-auto"
              style={{ fontSize: 37.5, fontWeight: "bold" }}
            >
              {pathname.slice(1)}
            </h1>
          </div>
        </div>
        <div class="w-full flex content-center">
        <button class="bg-pink-500 rounded w-fit px-3 py-3 text-xl text-black font-bold mx-auto mt-4">Generate More Images</button>
        </div>
        <div
          class="container max-sm:px-0"
          style={{ backgroundColor: "#000000", marginTop: "2.5rem" }}
        >
          <ImageLayout dataArr={newDataArr} />
        </div>
        <div class="w-full flex content-center">
        <button class="bg-pink-500 rounded w-fit px-3 py-3 text-xl text-black font-bold mx-auto mt-4">Generate More Images</button>
        </div>
      </div>
    </div>
  );
}
