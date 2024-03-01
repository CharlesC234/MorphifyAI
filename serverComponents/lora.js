"use server";
import Replicate from "replicate";
import axios from 'axios';
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
axios.defaults.timeout = 600000;
 
//   export async function TrainLora(zipUrl) {
//             // Train the model
//         const loraUrl = await replicate.run(
//             "cloneofsimo/lora-training:b2a308762e36ac48d16bfadc03a65493fe6e799f429f7941639a6acec5b276cc",
//             { input: { instance_data: zipUrl, resolution: 512, task: "face" } }
//         );
//         console.log(loraUrl);
//         return "https://replicate.delivery/pbxt/c32Ba8UOS6bFDBwybc16WDREfzWCqeCRUzL3YtTgNrTIrqaQA/" + loraUrl;
//   }


// export async function Img2Img(tempurl){
//     console.log("running...");
//     const output = await replicate.fetch(
//         "https://api.replicate.com/v1/predictions",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": process.env.REPLICATE_API_TOKEN,
//           },
//           version: "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
//           input: {
//             prompt: "An extremly realistic and high quality full body Instagram photo img of the woman fully nude. The face should match the referance images. The woman should have an extemly realistic and detailed vagina. High quality extremly realistic and detailed vagina and breasts showing in the image, the image should show their full body naked from head to toe. colorful, natural skin. High quality and realistic. Fully Naked, Solid Pale Background. No bra, No Panties. Extremly realistic and accurate face to the base image",
//             num_steps: 100,
//             style_name: "Photographic (Default)",
//             input_image: process.env.API + tempurl[0].url,
//             input_image2: process.env.API + [tempurl[1] ? tempurl[1].url : tempurl[0].url],
//             input_image3: process.env.API + [tempurl[2] ? tempurl[2].url : tempurl[0].url],
//             input_image4: process.env.API + [tempurl[3] ? tempurl[3].url : tempurl[0].url],
//             num_outputs: 1,
//             guidance_scale: 8.75,
//             negative_prompt: "unrealistic, clothed, wearing clothes, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, cartoon, painting, illustration, worst quality, low quality, normal quality",
//             style_strength_ratio: 22.5,
//             disable_safety_checker: true,
//           }, cache: "no-store",
//         }
//       )
//       console.log("output: " + output);
//       return output;
// }


export async function TrainLora(zipurl, name, id) {
    console.log("running training...");
    const data = {
        version: "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        destination: `charlesc234/${name}`,
        input: {
            input_images: zipurl,
            token_string: "TOK",
            caption_prefix: "A photo of TOK",
            max_train_steps: 2000,
            is_lora: true,
            use_face_detection_instead: true
        }
    };

    try {
        const createModel = await axios.post('https://api.replicate.com/v1/models', {
            owner: "charlesc234",
            name: name,
            description: "An example model",
            visibility: "private",
            hardware: "gpu-a40-large",
        }, {
            headers: {
                'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const model = createModel.data;
        console.log(model);

        const output = await axios.post('https://api.replicate.com/v1/models/stability-ai/sdxl/versions/39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b/trainings', data, {
            headers: {
                'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const outputJson = output.data;
        console.log(outputJson);

        const imageJson = await fetchImageUntilSuccess(outputJson);
        console.log("image: " + JSON.stringify(imageJson));
        const loraOutput = imageJson.output.version;
        console.log("Finished: " + imageJson.output.weights);

        await axios.put(`${process.env.API}/api/models/${id}`, {
            data: {
                lora: loraOutput,
            }
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }
}



async function fetchImageUntilSuccess(outputJson) {
    try {
        const response = await axios.get(outputJson.urls.get, {
            headers: {
                'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const imageJson = response.data;
        if(imageJson.status == 'cancelled'){
            return "cancelled";
        } else if (imageJson.status === 'succeeded') {
            // Stop the recursion when status is succeeded
            return imageJson;
        } else {
            // Wait for 60 seconds and then fetch again
            await new Promise(resolve => setTimeout(resolve, 30000));
            // Fetch again recursively
            return fetchImageUntilSuccess(outputJson);
        }
    } catch (error) {
        console.error('Error while fetching:', error);
    }
}


  
export async function Img2Img(loraUrl){
    console.log("running...");
    // Split the string at the first colon
    let splitString = loraUrl.split(":");
    // Get the substring after the first colon
    let newString = splitString[1];
    console.log(newString);

    const data = {
        version: newString,
        input: {
          prompt: "A photo of TOK completely naked. The photo should be of her full body. She should be sitting on the floor with her legs spread so her vagina and face can be seen in the image. She should have no clothes on, and the image should be a close up of her full body",
          negative_prompt: "clothes, panties, bra, unrealistic, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, cartoon, painting, illustration, worst quality, low quality, normal quality",
          width: 1024,
          height: 1024,
          num_outputs: 1,
          scheduler: "K_EULER",
          num_inference_steps: 200,
          guidance_scale: 7.5,
          prompt_strength: .8,
          high_noise_frac: .8,
          lora_scale: .85,
          apply_watermark: false,
          disable_safety_checker: true,
        }
      };
      
      const output = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        cache: "no-store",
      })

      const outputJson = await output.json();
      console.log(outputJson);

      const imageJson = await fetchImageUntilSuccess(outputJson);
      console.log("image: " + JSON.stringify(imageJson));
      const imgOutPut = imageJson.output;
      console.log("Finished: " + imgOutPut);
      return imgOutPut;
}


// export async function Img2Img(tempurl){
//     console.log("running...");
//     const data = {
//         version: "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
//         input: {
//           prompt: "An extremly realistic and high quality full body Instagram photo of the woman fully nude mastubating and playing with her vagina img. The women should be sitting on a bed with her legs spread and her fingers should be spreading her vagina lips. The woman should have an extemly realistic and detailed vagina. The face should match the referance images, and she should appear to be moaning. High quality extremly realistic and detailed vagina and breasts showing in the image, the image should show their full body naked from head to toe. She should not have any clothes on. She should have colorful, natural skin. High quality and realistic. Fully Naked, Solid Pale Background. No bra, No Panties. Extremly realistic and accurate face to the base image",
//           num_steps: 100,
//           style_name: "Photographic (Default)",
//           input_image: process.env.API + tempurl[0].url,
//           input_image2: process.env.API + [tempurl[1] ? tempurl[1].url : tempurl[0].url],
//           input_image3: process.env.API + [tempurl[2] ? tempurl[2].url : tempurl[0].url],
//           input_image4: process.env.API + [tempurl[3] ? tempurl[3].url : tempurl[0].url],
//           num_outputs: 1,
//           guidance_scale: 10,
//           negative_prompt: "unrealistic, clothed, wearing clothes, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, cartoon, painting, illustration, worst quality, low quality, normal quality",
//           style_strength_ratio: 30,
//           disable_safety_checker: true,
//         }
//       };
      
//       const output = await fetch('https://api.replicate.com/v1/predictions', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//         cache: "no-store",
//       })

//       const outputJson = await output.json();

//       const imageJson = await fetchImageUntilSuccess(outputJson);
//       console.log("image: " + JSON.stringify(imageJson));
//       const imgOutPut = imageJson.output;
//       console.log("Finished: " + imgOutPut);
//       return imgOutPut;
// }