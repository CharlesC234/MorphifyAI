"use server";


import JSZip from "jszip";
import axios from "axios";

const zip = new JSZip();


export async function zipFiles(files) {
// const fileArr = [
//     {
//         name: "file1.jpg",
//         url: "https://url.com/file1.jpg",
//     },
//     {
//         name: "file2.docx",
//         url: "https://url.com/file2.docx",
//     },
//     {
//         name: "file3.pdf",
//         url: "https://url.com/file3.pdf",
//     },
// ];

    async function download(item){
        //download single file as blob and add it to zip archive
        return axios.get(item.url.substring(5), { responseType: "blob" }).then((resp) => {
            zip.file(item.name, resp.data);
        });
    };

    const arrOfFiles = files.map((item) => download(item)); //create array of promises
    await Promise.all(arrOfFiles)
        .then(() => {
            //when all promises resolved - save zip file
            zip.generateAsync({ type: "blob" }).then(function (blob) {
                console.log(blob);
                return blob
            });
        })
        .catch((err) => {
            console.log(err);
        });
}