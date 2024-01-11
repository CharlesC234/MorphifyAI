"use client";

import { use, useState } from "react";
import * as fal from "@fal-ai/serverless-client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export default function Generate({ fields }) {
  const [img, setImg] = useState(
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
    var prompt = "A very attractive girl, with ";
    for (let i = 0; i < selected.length; i++) {
      prompt = prompt + selected[i].Field + "," + selected[i].Option + ",";
    }
    prompt = prompt + "posting for a high quality Instagram photo";
    const formatPrompt = prompt.toString();

    try {
      setLoading(true);
      const res = await fal.subscribe("110602490-lora", {
        input: {
          model_name: "SG161222/RealVisXL_V3.0_Turbo",
          model_architecture: "sdxl",
          num_inference_steps: 8,
          guidance_scale: 2,
          image_size: {
            width: 720,
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
      const imageUrl = await res.images[0].url;
      setLoading(false);
      setImg(imageUrl);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container flex grid-cols-2 grid-rows-1">
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

      <div className=" sticky">
        {loading ? <div className="spinner-simple"></div> : <img src={img} />}
        <button
          onClick={() => generateImage()}
          className="btn text-xl py-4 px-5 mt-4 me-3 mb-3 whitespace-nowrap flex md:hover:bg-pink-500 fw-bold bg-pink-500 outline outline-2 outline-pink-500 text-black"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
