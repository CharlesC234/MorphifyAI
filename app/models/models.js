"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";


export default function Models({models}){
    
    return <div style={{ backgroundColor: "#000000" }}>
    <div class="container mx-auto py-2 lg:pt-12 row mt-5 justify-content-between">
      {models.map((item) => {
        return (
          <a href={item.display_name} class="ms-2 mt-2" style={{ width: "23.5%" }}>
            <div class="flex flex-wrap p">
              <img
                alt="gallery"
                class="block object-cover object-center aspect-square"
                style={{ borderRadius: "100%" }}
                src={"http://localhost:1337" + item.profile_pic}
              />
              <h2
                class="mt-4 text-3xl"
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