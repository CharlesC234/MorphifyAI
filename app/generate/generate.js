"use client";
import { getUserData, getUserDataStrapi } from "../../serverComponents/patreon";
import * as fal from "@fal-ai/serverless-client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {PostModel} from "../../serverComponents/post";
import "@rainbow-me/rainbowkit/styles.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { PaperEmbeddedWalletProvider } from "@paperxyz/embedded-wallet-service-rainbowkit";
import JSZip from "jszip";
import axios from "axios";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

const generateRandomPersonPrompt = () => {
  // Define different attributes with weights
  const attributes = [
    { attribute: "eyes", weights: generateRandomWeights(7) },
    { attribute: "facial features", weights: generateRandomWeights(7) },
    { attribute: "eyebrows", weights: generateRandomWeights(7) },
    { attribute: "mouth", weights: generateRandomWeights(7) },
    { attribute: "ears", weights: generateRandomWeights(7) },
    { attribute: "chin", weights: generateRandomWeights(7) },
    { attribute: "lips", weights: generateRandomWeights(7) },
    { attribute: "cheekbones", weights: generateRandomWeights(7) },
    { attribute: "eye size", weights: generateRandomWeights(7) },
    // Add more attributes with respective weights
  ];

  // Generate a prompt with random attributes based on weights
  const randomPrompt = attributes
    .map(({ attribute, weights }) => {
      const randomIndex = getRandomWeightedIndex(weights);
      const randomOption = getRandomOptionForAttribute(attribute, randomIndex);
      return attribute + ":" + randomOption + ";";
    })
    .join("");

  return `${randomPrompt}.`;
};

// Helper function to generate random weights for an attribute
const generateRandomWeights = (count) => {
  const weights = [];
  for (let i = 0; i < count; i++) {
    weights.push(Math.random());
  }
  return weights;
};

// Helper function to get a random index based on weights
const getRandomWeightedIndex = (weights) => {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const randomValue = Math.random() * totalWeight;
  let cumulativeWeight = 0;

  for (let i = 0; i < weights.length; i++) {
    cumulativeWeight += weights[i];
    if (randomValue <= cumulativeWeight) {
      return i;
    }
  }

  return weights.length - 1; // Fallback to the last index
};

// Helper function to get a random option for a given attribute and index
const getRandomOptionForAttribute = (attribute, index) => {
  // Define options for each attribute
  const optionsMap = {
    "eyes": ["blue", "brown", "green", "gray", "hazel", "black", "amber"],
    "facial features": ["angular", "rounded", "symmetrical", "asymmetrical", "defined", "soft", "prominent"],
    "eyebrows": ["arched", "straight", "rounded", "angled", "thin", "thick", "natural"],
    "mouth": ["small", "average", "full", "thin", "wide", "narrow", "plump"],
    "ears": ["attached", "lobe", "pointed", "rounded", "prominent", "flat", "upturned"],
    "chin": ["pointed", "rounded", "square", "cleft", "double chin", "strong", "weak"],
    "lips": ["thin", "average", "full", "plump", "thin upper lip", "thin lower lip", "prominent cupid's bow"],
    "cheekbones": ["high", "prominent", "defined", "subtle", "flat", "wide", "narrow"],
    "eye size": ["large", "average", "small", "almond-shaped", "round", "slanted", "medium"],
    // Add more options for other attributes
  };

  return optionsMap[attribute][index];
};



//zip files
const zip = new JSZip();
async function download(item){
  //download single file as blob and add it to zip archive
  return axios.get(item.url.substring(5), { responseType: "blob" }).then((resp) => {
      zip.file(item.name, resp.data);
  });
};


export default function Generate({ fields }) {
  const clientId = "4f77ed5f-541a-4d3c-85ff-8788bbd2aa28";
  const router = useRouter();
  const [page, setPage] = useState("Create");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [zipUrl, setZipUrl] = useState();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [userData, setUserData] = useState({attributes: {Premium: false, Generations: 0}});
  const [generations, setGenerations] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);

  //handler function for image uploads
  const handleChange = event => {
    if (event.target.files && event.target.files[0]) {
      const temp = [];
      for(let i = 0; i < event.target.files.length; i++){
        temp.push({name: event.target.files[i].name, url: URL.createObjectURL(event.target.files[i])});
      }
      setUploadedImages([...uploadedImages, ...temp]);
      console.log(uploadedImages);
    }
  };

  useEffect(() => {
    //get user data for premium status (cannot be done server side because cookie needed for pid to fetch user data)
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

  const [img1, setImg1] = useState(
    null
  );
  const [img2, setImg2] = useState(
    null
  );
  const [img3, setImg3] = useState(
    null
  );
  const [loading, setLoading] = useState(false);

  // makeArr for fields from strapi
  var makeArr = [];
  for (let i = 0; i < fields.length; i++) {
    makeArr.push({
      Field: fields[i].attributes.FieldName,
      Option: fields[i].attributes.Option[0].OptionTitle,
    });
  }
  const [selected, setSelected] = useState(makeArr.slice(0,-2));
  const [selectedPost, setSelectedPost] = useState(makeArr.slice(-2));
  const [refresh, setRefresh] = useState(false);
  const [totalPercent, setTotalPercent] = useState(0);  
  const [selectedModel, setSelectedModel] = useState(0);
  const percentEach = [0,0,0];
  const images = [];


  //generate image function for 3 profile pic images for user to choose from
  async function generateImage() {

    try {
      setLoading(true);
      setTotalPercent(0);

      for(let i = 0; i < 3; i++){
        var promptrand = generateRandomPersonPrompt();
        var prompt = "nude full body of girl with " + promptrand;
        for (let i = 0; i < selected.length; i++) {
          prompt = prompt + selected[i].Field + ":" + selected[i].Option + ";";
        }

        const formatPrompt = prompt.toString();
        const res = await fal.subscribe("110602490-lora", {
        input: {
          model_name: "SG161222/RealVisXL_V3.0_Turbo",
          model_architecture: "sdxl",
          num_inference_steps: 10,
          guidance_scale: 2,
          image_size: {
            width: 1080,
            height: 1080,
          },
          prompt: formatPrompt,
        },
        logs: true,

        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });
      images.push(await res.images[0]);
      console.log("here: " + await JSON.stringify(res.images[0]));
    }
      setLoading(false);
      setImg1(images[0]);
      setImg2(images[1]);
      setImg3(images[2]);
    } catch (e) {
      console.log(e);
    }
  }



  async function generateImageToImage(uploadedImages) {
    setLoading(true);
      const arrOfFiles = uploadedImages.map((item) => download(item)); //create array of promises
      Promise.all(arrOfFiles).then(() => {
              //when all promises resolved - save zip file
              zip.generateAsync({ type: "blob" }).then(async function (blob) {
                  console.log(blob);
                  var tempurl = URL.createObjectURL(blob);
                  console.log(tempurl);
                  tempurl = tempurl.substring(5);
                  try {
                    console.log("made it here");
                    setTotalPercent(0);
              
                    for(let i = 0; i < 3; i++){
                      const res = await fal.subscribe("110602490-photomaker", {
                        input: {
                          prompt: "A full body img of the person fully nude, they should be very attractive, the image should be high quality and show their full body naked",
                          image_archive_url: tempurl,
                          negative_prompt: "cartoon, illustration, animation, headshot",
                          num_inference_steps: 50,
                          initial_image_strength: 0.65,
                          guidance_scale: 7.5,
                          image_size: {
                           width: 1080,
                           height: 1080,
                        },
                        },
                        logs: true,
                        onQueueUpdate: (update) => {
                          if (update.status === "IN_PROGRESS") {
                            update.logs.map((log) => log.message).forEach(console.log);
                          }
                        },
                      });
              
                    images.push(await res.images[0]);
                    console.log("here: " + await JSON.stringify(res.images[0]));
                  }
                    setLoading(false);
                    setImg1(images[0]);
                    setImg2(images[1]);
                    setImg3(images[2]);
                  } catch (e) {
                    console.log(e);
                  }
              });
          })
          .catch((err) => {
              console.log(err);
          });
  }




  return (
    <div className="container">
    <div className="flex md:mt-10 max-sm:flex-col max-sm:px-1 max-sm:mt-8 md:flex-row">
    <div className="w-fit mt-2 me-28">
      <div className="flex-column">

        {/* side menu, select from create model from scratch or image upload*/} 
        {/* 
        //
        //
        */}
        <h2 className="text-4xl font-bold mb-4" style={{opacity: .8}}>Generate</h2>
        <button
          data-toggle="button"
          style={{
            paddingLeft: 17.5,
            fontWeight: "700",
            paddingRight: 17.5,
            paddingBottom: 7.5,
            paddingTop: 7.5,
            borderRadius: 10,
          }}
          onClick={() => {
            setPage("Create");
          }}
          className={`whitespace-nowrap flex md:hover:bg-pink-500
            ${page == "Create" ? "fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
            : "bg-black outline outline-2 outline-offset-0 outline-pink-500 text-pink-500"}`}
        >
          Create Model From Scratch
        </button>
        <button
          data-toggle="button"
          style={{
            paddingLeft: 17.5,
            fontWeight: "700",
            marginTop: 13,
            paddingRight: 17.5,
            paddingBottom: 7.5,
            paddingTop: 7.5,
            borderRadius: 10,
          }}
          onClick={() => {
            setPage("Upload");
          }}
          className={`whitespace-nowrap flex md:hover:bg-pink-500
          ${page == "Upload" ? "fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
          : "bg-black outline outline-2 outline-offset-0 outline-pink-500 text-pink-500"}`}
        >
          Create From Referance Images
        </button>
      </div>
    </div>
    <div className="w-fit max-sm:mt-7 mt-5">


      {/* Create from scratch tab */} 
        {/* 
        //
        //
        */}

    <div className={`${page == "Create" ? "" : "hidden"}`}>
            <div className="mx-auto max-w-5xl">
      <div>
      <div className="container">  
      <div>
        {fields.slice(0,-2).map((item, outerIndex) => {
          return (
            <div
              style={{ width: "100%", minWidth: 250, maxWidth: 1000 }}
              key={item.attributes.FieldName}
            >
              <h2 className="mt-4 font-bold" style={{ opacity: .8, fontSize: 27.5 }}>
                {item.attributes.FieldName}
              </h2>
              <div className="flex flex-wrap mt-4">
                {item.attributes.Option.map((itemInner, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        var temp = selected;
                        for (let i = 0; i <= selected.length; i++) {
                          if (i == outerIndex) {
                            temp[i].Option = itemInner.OptionTitle;
                          }
                          setSelected(temp);
                          setRefresh(!refresh);
                        }
                      }}
                      data-toggle="button"
                      style={{
                        paddingLeft: 17.5,
                        fontWeight: "600",
                        marginRight: 15,
                        marginBottom: 15,
                        paddingRight: 17.5,
                        paddingBottom: 7.5,
                        paddingTop: 7.5,
                        borderRadius: 8.5,
                      }}
                      className={`whitespace-nowrap flex md:hover:bg-pink-500
              ${
                selected[outerIndex].Option == itemInner.OptionTitle
                  ? "fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
                  : "bg-black outline outline-2 outline-offset-0 outline-pink-500 text-pink-500"
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
      </div>

      {/* diffrent generation button based on signed in, premium, and number of free generations*/} 
        {/* 
        //
        //
        */}

      <div className="sticky">
        {userData.attributes.Premium ? 
        <button
          onClick={() => {
            generateImage()}}
          className="btn text-xl py-4 px-5 mt-4 me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
        >
          GENERATE NO PAYMENT
        </button>
        : <>
        {generations > 0 ?  <button
          onClick={() => {
            generateImage();
            fetch(process.env.API + `/api/discord-users/${userData.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  Generations: generations - 1,
                },
              }),
            });
            setGenerations(generations - 1);
          }}
          className="btn text-xl py-4 px-5 mt-4 me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
        >
          GENERATE NO PAYMENT
        </button>
        :
                <button
                className={`btn text-xl py-4 px-5 mt-4 me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black`}
                onClick={() => {
                  router.push(pathname + "?" + createQueryString("ee", true));
                }}
              >
                GENERATE
              </button>}</>
           }
        {loading ? 
        // <div style={{display: 'flex', flexDirection: 'row'}}>
        // <h2 className="mt-4 me-4">{totalPercent}%</h2>
        // <div className="outline outline-2 outline-pink-500 mt-4" style={{width: '50%', height: 20, borderRadius: 10, overflow: 'hidden'}}>
        // <div className="bg-pink-500" style={{width: `${totalPercent}%`, height: 20}}></div> 
        // </div>
        // </div>
        <div className="spinner-simple mt-4" style={{width: 100, height: 100}}></div>
        : 
        <>{!loading && img1 == null ? <></>: 
        <div>
          <h2 className="mt-5 text-2xl font-bold mb-4" style={{ opacity: 0.8 }}>
                Select A Model
          </h2>
        <div className="w-100 grid max-sm:grid-rows-3 md:grid-cols-3 gap-3 mt-4 mb-5">
          <button style={{borderRadius: '100%'}} className={`aspect-square w-100 grid-col-1 justify-center ${selectedModel == 0 ? "bg-pink-500" : ""}`} onClick={() => setSelectedModel(0)}>
          <img className="aspect-square mx-auto" src={img1.url} style={{width: '97.5%', borderRadius: '100%', objectFit: 'cover', borderWidth: 5, borderColor: '#000000', backgroundColor: '#000000'}} /> 
          </button>
          <button style={{borderRadius: '100%'}} className={`aspect-square w-100 grid-col-1 justify-center ${selectedModel == 1 ? "bg-pink-500" : ""}`} onClick={() => setSelectedModel(1)}>
          <img className="aspect-square mx-auto" src={img2.url} style={{width: '97.5%', borderRadius: '100%', objectFit: 'cover', borderWidth: 5, borderColor: '#000000', backgroundColor: '#000000'}} /> 
          </button>
          <button style={{borderRadius: '100%'}} className={`aspect-square w-100 grid-col-1 justify-center ${selectedModel == 2 ? "bg-pink-500" : ""}`} onClick={() => setSelectedModel(2)}>
          <img className="aspect-square mx-auto" src={img3.url} style={{width: '97.5%', borderRadius: '100%', objectFit: 'cover', borderWidth: 5, borderColor: '#000000', backgroundColor: '#000000'}} /> 
          </button>
          </div>
          <div>

            {/* options for after model selected */} 
        {/* 
        //
        //
        */}
        {fields.slice(-2).map((item, outerIndex) => {
          return (
            <div
            className="mt-4"
              style={{ width: "1000%", minWidth: 250, maxWidth: 1000 }}
              key={item.attributes.FieldName}
            >
              <h2 className="mt-4 text-2xl font-bold" style={{ opacity: 0.8 }}>
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
                  : "bg-black outline outline-2 outline-offset-0 outline-pink-500 text-pink-500"
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
        <button
                className={`btn text-xl py-4 px-5 mt-4 me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black`}
                onClick={() => {
                  if(images.length == 0){
                    images.push(img1);
                    images.push(img2);
                    images.push(img3);
                  }
                  console.log(images);
                  PostModel(images[selectedModel], "Test12", false, localStorage.getItem("pid"));
                }}
              >
                Generate {selectedPost[1].Option} Photos
              </button>
      </div>
          </div>}</>
        }
      </div>
    </div>
      </div>
      </div>
      </div>

      {/* generate from image tab*/} 
        {/* 
        //
        //
        */}

      <div className={`${page == "Upload" ? "" : "hidden"}`}>
      <h2 className="mt-4 text-2xl font-bold mb-2" style={{ opacity: 0.8 }}>
                Add As Many Images As Possible For Best Result
              </h2>
{uploadedImages.length == 0 ? 
    <div class="flex items-center justify-center w-full mt-3">
 <label style={{backgroundColor: 'rgba(31, 41, 55, .75)'}} for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input onChange={handleChange} id="dropzone-file" type="file" multiple class="hidden" />
    </label>
</div> :
<div className="grid md:grid-cols-3 max-sm:grid-cols-1 gap-3">
{[...uploadedImages, "/"].map((item, index) => {
  if(item == "/"){
    return(
    <div key={index} class="flex items-center justify-center w-full mt-3 aspect-square" style={{borderRadius: '50%'}}>
    <label style={{backgroundColor: 'rgba(31, 41, 55, .75)', borderRadius: '50%'}} for="dropzone-file" class="flex flex-col items-center justify-center w-full border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600 aspect-square">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input onChange={handleChange} id="dropzone-file" type="file" multiple class="hidden" />
    </label>
</div> );
  }else{
   return( <div key={index} class="flex items-center justify-center w-full mt-3 aspect-square" style={{borderRadius: '50%'}}>
    <img style={{borderRadius: '50%'}} className="aspect-square" src={item.url}></img>
    </div>)
  }
})}
</div>
}


      {fields.slice(-2).map((item, outerIndex) => {
          return (
            <div
            className="mt-5"
              style={{ width: "100%", minWidth: 250, maxWidth: 1000 }}
              key={item.attributes.FieldName}
            >
              <h2 className="mt-4 text-2xl font-bold" style={{ opacity: 0.8 }}>
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
                  : "bg-black outline outline-2 outline-offset-0 outline-pink-500 text-pink-500"
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

<div className="sticky">
        {userData.attributes.Premium ? 
        <button
          onClick={() => {
            generateImageToImage(uploadedImages)}}
          className="btn text-xl py-4 px-5 mt-4 me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
        >
          GENERATE NO PAYMENT
        </button>
        : <>
        {generations > 0 ?  <button
          onClick={() => {
            generateImageToImage(uploadedImages);
            fetch(process.env.API + `/api/discord-users/${userData.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  Generations: generations - 1,
                },
              }),
            });
            setGenerations(generations - 1);
          }}
          className="btn text-xl py-4 px-5 mt-4 me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
        >
          GENERATE NO PAYMENT
        </button>
        :
                <button
                className={`btn text-xl py-4 px-5 mt-4 me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black`}
                onClick={() => {
                  router.push(pathname + "?" + createQueryString("ee", true));
                }}
              >
                GENERATE
              </button>}</>
           }
        {loading ? 
        // <div style={{display: 'flex', flexDirection: 'row'}}>
        // <h2 className="mt-4 me-4">{totalPercent}%</h2>
        // <div className="outline outline-2 outline-pink-500 mt-4" style={{width: '50%', height: 20, borderRadius: 10, overflow: 'hidden'}}>
        // <div className="bg-pink-500" style={{width: `${totalPercent}%`, height: 20}}></div> 
        // </div>
        // </div>
        <div className="spinner-simple mt-4" style={{width: 100, height: 100}}></div>
        : 
        <>{!loading && img1 == null ? <></>: 
        <div>
          <h2 className="mt-5 text-2xl font-bold mb-4" style={{ opacity: 0.8 }}>
                Select A Model
          </h2>
        <div className="w-100 grid max-sm:grid-rows-3 md:grid-cols-3 gap-3 mt-4 mb-5">
          <button style={{borderRadius: '100%'}} className={`aspect-square w-100 grid-col-1 justify-center ${selectedModel == 0 ? "bg-pink-500" : ""}`} onClick={() => setSelectedModel(0)}>
          <img className="aspect-square mx-auto" src={img1.url} style={{width: '97.5%', borderRadius: '100%', objectFit: 'cover', borderWidth: 5, borderColor: '#000000', backgroundColor: '#000000'}} /> 
          </button>
          <button style={{borderRadius: '100%'}} className={`aspect-square w-100 grid-col-1 justify-center ${selectedModel == 1 ? "bg-pink-500" : ""}`} onClick={() => setSelectedModel(1)}>
          <img className="aspect-square mx-auto" src={img2.url} style={{width: '97.5%', borderRadius: '100%', objectFit: 'cover', borderWidth: 5, borderColor: '#000000', backgroundColor: '#000000'}} /> 
          </button>
          <button style={{borderRadius: '100%'}} className={`aspect-square w-100 grid-col-1 justify-center ${selectedModel == 2 ? "bg-pink-500" : ""}`} onClick={() => setSelectedModel(2)}>
          <img className="aspect-square mx-auto" src={img3.url} style={{width: '97.5%', borderRadius: '100%', objectFit: 'cover', borderWidth: 5, borderColor: '#000000', backgroundColor: '#000000'}} /> 
          </button>
          </div>
          <div>

        <button
                className={`btn text-xl py-4 px-5 mt-4 me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black`}
                onClick={() => {
                  if(images.length == 0){
                    images.push(img1);
                    images.push(img2);
                    images.push(img3);
                  }
                  console.log(images);
                  PostModel(images[selectedModel], "Test12", false, localStorage.getItem("pid"));
                }}
              >
                Generate {selectedPost[1].Option} Photos
              </button>
      </div>
          </div>}</>
        }
      </div>
      </div>
    </div>
    </div>
    </div>
  );
}
