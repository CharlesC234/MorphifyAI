"use client";

import { use, useState } from "react";
import * as fal from "@fal-ai/serverless-client";

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
  const [img1, setImg1] = useState(
    "http://farm5.staticflickr.com/4112/5170590074_066e255655_o.jpg"
  );
  const [img2, setImg2] = useState(
    "http://farm5.staticflickr.com/4112/5170590074_066e255655_o.jpg"
  );
  const [img3, setImg3] = useState(
    "http://farm5.staticflickr.com/4112/5170590074_066e255655_o.jpg"
  );
  const [loading, setLoading] = useState(false);
  var makeArr = [];
  for (let i = 0; i < fields.length; i++) {
    makeArr.push({
      Field: fields[i].attributes.FieldName,
      Option: fields[i].attributes.Option[0].OptionTitle,
    });
  }
  const [selected, setSelected] = useState(makeArr);
  const [refresh, setRefresh] = useState(false);

  async function generateImage() {

    try {
      setLoading(true);
      const imageUrl = [];

      for(let i = 0; i < 3; i++){
        var promptrand = generateRandomPersonPrompt();
        var prompt = "nude full body of girl with " + promptrand;
        for (let i = 0; i < selected.length; i++) {
          prompt = prompt + selected[i].Field + ":" + selected[i].Option + ";";
        }
        prompt = prompt + "Testing length of prompt if 77 tokens or more..............";
        console.log(prompt);

        const formatPrompt = prompt.toString();
        const res = await fal.subscribe("110602490-lora", {
        input: {
          model_name: "SG161222/RealVisXL_V3.0_Turbo",
          model_architecture: "sdxl",
          num_inference_steps: 8,
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
      <div>
        {fields.map((item, outerIndex) => {
          return (
            <div
              style={{ width: "80%", minWidth: 350 }}
              key={item.attributes.FieldName}
            >
              <h2 className="mt-5 text-2xl font-bold" style={{ opacity: 0.8 }}>
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
                        paddingRight: 17.5,
                        paddingBottom: 7.5,
                        paddingTop: 7.5,
                        borderRadius: 8.5,
                      }}
                      className={`me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500
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
        <button
          onClick={() => generateImage()}
          className="btn text-xl py-4 px-5 mt-4 me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
        >
          Generate
        </button>
        <script src="https://gumroad.com/js/gumroad.js"></script>
        <a class="gumroad-button" href="https://xpixels.gumroad.com/l/ppski?userid=1" data-gumroad-overlay-checkout="true">Buy on</a>
        {loading ? <div className="spinner-simple mt-2" style={{width: 100, height: 100}}></div> : 
        <div>
          <h2 className="mt-5 text-3xl font-bold" style={{ opacity: 0.8 }}>
                Select A Model
          </h2>
        <div className="w-100 grid grid-cols-3 gap-5 mt-4">
          <div className="aspect-square w-100 grid-col-1">
          <img className="mt-3 aspect-square w-100" src={img1} style={{borderRadius: '100%', objectFit: 'cover'}} /> 
          </div>
          <div className="aspect-square w-100">
          <img className="mt-3 aspect-square w-100" src={img2} style={{borderRadius: '100%', objectFit: 'cover'}} /> 
          </div>
          <div className="aspect-square w-100">
          <img className="mt-3 aspect-square w-100" src={img3} style={{borderRadius: '100%', objectFit: 'cover'}} /> 
          </div>
          </div>
          </div>}
      </div>
    </div>
  );
}
