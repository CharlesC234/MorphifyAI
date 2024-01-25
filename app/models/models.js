"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import Image from "next/image";

export default function Models({ models }) {
  return (
    <div style={{ backgroundColor: "#000000" }}>
      <iframe
        className="mt-4 mx-auto md:hidden rounded"
        src="//a.magsrv.com/iframe.php?idzone=5100030&size=300x100"
        width="300"
        height="100"
      ></iframe>
      <iframe
        className="mt-4 mx-auto max-sm:hidden rounded"
        src="//a.magsrv.com/iframe.php?idzone=5100010&size=900x250"
        width="900"
        height="250"
      ></iframe>
      <div className="container grid md:grid-cols-4 md:gap-3 p-10 justify-center md:p-0 grid-cols-1 mx-auto py-2 lg:pt-12 row mt-5 md:justify-content-between ">
        {models.map((item, index) => {
          return (
            <a
              key={index}
              href={item.display_name}
              className={`aspect-square grid-col-1 px-0 md:mt-0 md:mb-7 ${
                index == 0 ? "mt-0" : "mt-11"
              }`}
            >
              <div className="aspect-square justify-center" style={{width: '100%'}}>
              <div className="aspect-square mx-auto" style={{width: '95%', height: '95%', position: 'relative'}}>
                <Image
                  alt="gallery"
                  fill={true}
                  className="aspect-square"
                  style={{ borderRadius: "100%" }}
                  src={process.env.API + item.profile_pic}
                />
                </div>
                <h2
                  className="mt-4 md:text-3xl text-4xl"
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
