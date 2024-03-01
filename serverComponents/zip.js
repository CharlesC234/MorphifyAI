"use client";
import JSZip from "jszip";
import axios from "axios";

 
  export async function PostZip(uploadedImages, pid, name) {

    const downloads = await Promise.all(uploadedImages.map(async (image) => {
        console.log(image.url);
        const response = await fetch(image.url);
        const contentType = response.headers.get('Content-Type')
        const data = await response.arrayBuffer();
        return {
          ...image,
          data,
          type: contentType?.replace('image/', '')
        }
      }))
    
      const zip = new JSZip();
    
      downloads.forEach((download) => {
        zip.file(`${download.name}.${download.type}`, download.data);
      })


    return new Promise((resolve, reject) => {
        var zipName = name.slice(0, -3) + "zip";
        var url = null;

            zip.generateAsync({ type: "blob" }).then(async function (blob) {
                try {
                    const formData = new FormData();
                    fetch(process.env.API + `/api/models/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            data: {
                                display_name: name,
                                pid: pid,
                                public: 'false',
                            },
                        }),
                    }).then((res) => {
                        res.json().then((response) => {
                            // Create a FormData object to send the image data
                            formData.append('files', blob, zipName);
                            // Upload
                            formData.append('ref', 'api::model.model');
                            formData.append('refId', response.data.id);
                            formData.append('field', 'zip');
                             // Make a POST request using fetch
                            fetch(process.env.API + `/api/upload`, {
                                method: 'POST',
                                body: formData,
                            }).then((res3) => {
                                res3.json().then((response2) => {
                                    console.log(response2)
                                    url = process.env.API + response2[0].url;
                                    console.log(url);
                                    resolve({url: url, id: response.data.id}); // Resolve with the URL
                                }).catch(reject);
                            }).catch(reject);
                        }).catch(reject);
                    }).catch(reject);
                 } catch (error) {
                    console.error(error);
                    reject(error); // Reject the promise in case of error
                }
            });
})}
