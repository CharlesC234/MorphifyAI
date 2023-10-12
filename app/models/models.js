"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";

export default function Models({ models }) {
  return (
    <div style={{ backgroundColor: "#000000" }}>
      <iframe class="mt-4 mx-auto md:hidden rounded" src="//a.magsrv.com/iframe.php?idzone=5100030&size=300x100" width="300" height="100" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
      <iframe class="mt-4 mx-auto max-sm:hidden rounded" src="//a.magsrv.com/iframe.php?idzone=5100010&size=900x250" width="900" height="250" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
      <div class="container grid md:grid-cols-4 md:gap-3 p-10 justify-center md:p-0 grid-cols-1 mx-auto py-2 lg:pt-12 row mt-5 md:justify-content-between ">
        {models.map((item, index) => {
          return (
            <a
              key={index}
              href={item.display_name}
              class={`grid-col-1 md:mt-0 md:mb-10 ${index == 0 ? "mt-0" : "mt-16"}`}
            >
              <div class="flex flex-wrap">
                <img
                  alt="gallery"
                  class="block object-cover object-center aspect-square"
                  style={{ borderRadius: "100%" }}
                  src={process.env.API + item.profile_pic}
                />
                <h2
                  class="mt-4 md:text-3xl text-4xl"
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {item.display_name}
                </h2>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
