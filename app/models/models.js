"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import Image from "next/image";
import { getUserDataStrapi } from "../../serverComponents/patreon";
import { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { getModelsPrivate } from "../../serverComponents/strapiFetchFunctions";

export default function Models({ models }) {
  const [premium, setPremium] = useState(true);
  const [privModels, setPrivModels] = useState([]);

  useEffect(() => {
    if(localStorage.getItem("pid") && localStorage.getItem("pid") != "null"){
     getModelsPrivate(localStorage.getItem("pid")).then((res) => {
        let temp = res.data;
        if(temp == undefined){
          temp = ["/"];
          setPrivModels(temp);
        }else if(temp[0] != "/"){
          let modelsNew = [];

          for (let i = 0; i < temp.length; i++) {
            modelsNew.push({
              display_name: temp[i].attributes.display_name,
              profile_pic: temp[i].attributes.profile_pic.data.attributes.url,
            });
          }
        
          modelsNew.sort((a, b) => a.display_name.localeCompare(b.display_name));
          modelsNew.unshift("/");
          setPrivModels(modelsNew);
        }
      })
      getUserDataStrapi(localStorage.getItem("pid")).then((res) => {
        if (res.data[0].attributes) {
          setPremium(res.data[0].attributes.Premium);
        }
      });
    }else{
      setPremium(false);
      if(models[0] != "/"){
        models.unshift("/");
      }
    }
  }, [])

  console.log("PrivModels: " + privModels);
  
  return (
    <div style={{ backgroundColor: "#000000" }}>
      {premium ? <></> : 
      <>
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
      </>
      }
      <div className="mt-5">
      <div className="container max-sm:container-fluid">
        <div className="container">
        <h2 className="text-3xl font-bold mb-4" style={{opacity: .8}}>My Models</h2>
        </div>
          </div>
      <div className="container grid md:grid-cols-4 md:gap-5 p-10 justify-center md:p-0 grid-cols-1 mx-auto py-2 lg:pt-12 row md:justify-content-between ">
        {premium ? <> 
          {privModels.map((item, index) => {
          if(index == 0){
            console.log("reached index 0");
            return (
              <a
              key={index}
              href={"/generate"}
              className={`aspect-square grid-col-1 px-0 md:mt-0 md:mb-7 ${
                index == 0 ? "mt-0" : "mt-11"
              }`}
            >
              <div className="aspect-square justify-center" style={{width: '100%'}}>
              <div className="aspect-square mx-auto" style={{width: '95%', height: '95%', position: 'relative'}}>
              <div className="flex aspect-square border-pink-500 border-dashed border-3 justify-center" style={{borderRadius: '50%'}}>
              <IoAdd className="w-50 h-50 text-pink-500 m-auto"/>
                </div>
                </div>
                <h2
                  className="mt-4 md:text-3xl text-4xl text-pink-500"
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Create Model
                </h2>
              </div>
            </a>
            )
          }else{
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
                    opacity: .85,
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {item.display_name}
                </h2>
              </div>
            </a>
          )};
        })}
        </> : <></>}
        </div>
        {premium ? <div className="container max-sm:container-fluid">
        <div className="mb-4 max-sm:mt-10 max-sm:mb-10" style={{backgroundColor: '#000000', borderBottomWidth: 2, borderColor: 'rgba(255,255,255,.15)'}}></div>
        <div className="container">
        <h2 className="text-3xl font-bold mb-4 mt-4.5 max-sm:mt-0" style={{opacity: .8}}>Public Models</h2>
        </div>
          </div> : <></>}
        <div className="container grid md:grid-cols-4 md:gap-5 p-10 justify-center md:p-0 grid-cols-1 mx-auto py-2 lg:pt-12 row md:justify-content-between ">
        {
        models.map((item, index) => {
          if(index == 0 && premium == false){
            return (
              <a
              key={index}
              href={"/generate"}
              className={`aspect-square grid-col-1 px-0 md:mt-0 md:mb-7 ${
                index == 0 ? "mt-0" : "mt-11"
              }`}
            >
              <div className="aspect-square justify-center" style={{width: '100%'}}>
              <div className="aspect-square mx-auto" style={{width: '95%', height: '95%', position: 'relative'}}>
              <div className="flex aspect-square border-pink-500 border-dashed border-3 justify-center" style={{borderRadius: '50%'}}>
              <IoAdd className="w-50 h-50 text-pink-500 m-auto"/>
                </div>
                </div>
                <h2
                  className="mt-4 md:text-3xl text-4xl text-pink-500"
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Create Model
                </h2>
              </div>
            </a>
            )
          }
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
                    opacity: .85,
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
    </div>
  );
}
