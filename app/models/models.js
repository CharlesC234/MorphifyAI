"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";


export default function Models({models}){
    
    return <div style={{ backgroundColor: "#000000" }}>
    <div class="container grid md:grid-cols-4 md:gap-2 p-10 justify-center md:p-0 grid-cols-1 mx-auto py-2 lg:pt-12 row mt-5 md:justify-content-between ">
      {models.map((item) => {
        return (
          <a href={item.display_name} class="grid-col-1 md:mt-0 mt-16">
            <div class="flex flex-wrap">
              <img
                alt="gallery"
                class="block object-cover object-center aspect-square"
                style={{ borderRadius: "100%" }}
                src={"http://localhost:1337" + item.profile_pic}
              />
              <h2
                class="mt-4 md:text-3xl text-4xl"
                style={{
                    fontSize: 28,
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
}