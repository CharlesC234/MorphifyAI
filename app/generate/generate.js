"use client";
import { getUserData, getUserDataStrapi } from "../../serverComponents/patreon";
import * as fal from "@fal-ai/serverless-client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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



export default function Generate({ fields }) {

  const router = useRouter();
  const [page, setPage] = useState("Create");
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

  const [img1, setImg1] = useState(
    "/"
  );
  const [img2, setImg2] = useState(
    "/"
  );
  const [img3, setImg3] = useState(
    "/"
  );
  const [loading, setLoading] = useState(false);
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
  const [selectedModel, setSelectedModel] = useState(1);
  const percentEach = [0,0,0];

  async function generateImage() {

    try {
      setLoading(true);
      setTotalPercent(0);
      const imageUrl = [];

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
      imageUrl.push(await res.images[0].url);
    }
      setLoading(false);
      setImg1(imageUrl[0]);
      setImg2(imageUrl[1]);
      setImg3(imageUrl[2]);
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <div className="container">
    <div className="flex md:mt-10 max-sm:flex-col max-sm:px-1 max-sm:mt-8 md:flex-row">
    <div className="w-fit mt-2 me-28">
      <div className="flex-column">
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


    <div className={`${page == "Create" ? "" : "hidden"}`}>
            <div className="mx-auto max-w-5xl">
      <div>
      <div className="container">  
      <div>
        {fields.slice(0,-2).map((item, outerIndex) => {
          return (
            <div
              style={{ width: "100%", minWidth: 350, maxWidth: 1000 }}
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
        <>{!loading && img1 == "/" ? <></>: 
        <div>
          <h2 className="mt-5 text-2xl font-bold mb-4" style={{ opacity: 0.8 }}>
                Select A Model
          </h2>
        <div className="w-100 grid grid-rows-3 md:grid-cols-3 gap-3 mt-4 mb-5">
          <button style={{borderRadius: '100%'}} className={`aspect-square w-100 grid-col-1 justify-center ${selectedModel == 1 ? "bg-pink-500" : ""}`} onClick={() => setSelectedModel(1)}>
          <img className="aspect-square mx-auto" src={img1} style={{width: '97.5%', borderRadius: '100%', objectFit: 'cover', borderWidth: 5, borderColor: '#000000', backgroundColor: '#000000'}} /> 
          </button>
          <button style={{borderRadius: '100%'}} className={`aspect-square w-100 grid-col-1 justify-center ${selectedModel == 2 ? "bg-pink-500" : ""}`} onClick={() => setSelectedModel(2)}>
          <img className="aspect-square mx-auto" src={img2} style={{width: '97.5%', borderRadius: '100%', objectFit: 'cover', borderWidth: 5, borderColor: '#000000', backgroundColor: '#000000'}} /> 
          </button>
          <button style={{borderRadius: '100%'}} className={`aspect-square w-100 grid-col-1 justify-center ${selectedModel == 3 ? "bg-pink-500" : ""}`} onClick={() => setSelectedModel(3)}>
          <img className="aspect-square mx-auto" src={img3} style={{width: '97.5%', borderRadius: '100%', objectFit: 'cover', borderWidth: 5, borderColor: '#000000', backgroundColor: '#000000'}} /> 
          </button>
          </div>
          <div>
        {fields.slice(-2).map((item, outerIndex) => {
          return (
            <div
            className="mt-4"
              style={{ width: "80%", minWidth: 350, maxWidth: 1000 }}
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
      </div>
          </div>}</>
        }
      </div>
    </div>
      </div>
      </div>
      </div>
      <div className={`${page == "Upload" ? "" : "hidden"}`}>
      {fields.slice(-2).map((item, outerIndex) => {
          return (
            <div
            className="mt-4"
              style={{ width: "80%", minWidth: 350, maxWidth: 1000 }}
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
      </div>
    </div>
    </div>
    </div>
  );
}
