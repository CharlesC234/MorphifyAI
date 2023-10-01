"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Models() {
  const { data, error } = useSWR(
    "http://localhost:1337/api/models?populate=*",
    fetcher
  );

  const models = [];

  if (!data)
    return <div style={{ backgroundColor: "#000000", height: 1000 }}></div>;

  for (let i = 0; i < data.data.length; i++) {
    models.push({
      display_name: data.data[i].attributes.display_name,
      profile_pic: data.data[i].attributes.profile_pic.data.attributes.url,
    });
  }
  return (
    <div style={{ backgroundColor: "#000000" }}>
      <div class="container mx-auto py-2 lg:pt-12 row mt-5 justify-content-between">
        {models.map((item) => {
          return (
            <a href={item.display_name} class="ms-2" style={{ width: "32.5%" }}>
              <div class="flex flex-wrap p">
                <img
                  alt="gallery"
                  class="block rounded object-cover object-center"
                  style={{ borderRadius: "50%" }}
                  src={"http://localhost:1337" + item.profile_pic}
                />
                <h2
                  class="mt-4"
                  style={{
                    fontSize: "30px",
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
      <div style={{ backgroundColor: "#000000", height: 1000 }} />
    </div>
  );
}
