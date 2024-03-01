"use client"

export async function PostModel(profilePic, name, isPublic, pid) {
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
            Public: isPublic,
            pid: pid,
          },
        }),
      }).then((res) => {
        res.json().then((response) => {
            // Create a FormData object to send the image data
            fetch(profilePic.url)
            .then(res2 => res2.blob())
            .then(blob => {
            formData.append('files', blob, profilePic.file_name)
            // Upload
            formData.append('ref', 'api::model.model');
            formData.append('refId', response.data.id);
            formData.append('field', 'profile_pic');

            // Make a POST request using fetch
            fetch(process.env.API + `/api/upload`, {
              method: 'POST',
              body: formData,
          }).then((res3) => {res3.json().then((response2) => {console.log(response2)})});
            })
        });
      });
        
    } catch (error) {
      console.error(error);
      return null;
    }
  }



  

  export async function PostReferenceImg(imageArr, name, pid) {
    try {
        const formData = new FormData();

        const res = await fetch(process.env.API + `/api/models/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    display_name: name,
                    Public: false,
                    pid: pid,
                },
            }),
        });

        const response = await res.json();

        // Create a FormData object to send the image data
        for (let i = 0; i < imageArr.length; i++) {
            console.log("hello" + imageArr[i].url.substring(5));
            console.log("file: " + imageArr[i].file);
            formData.append('files', imageArr[i].file, imageArr[i].name);
        }

        // Upload
        formData.append('ref', 'api::model.model');
        formData.append('refId', response.data.id);
        formData.append('field', 'reference_images');

        // Make a POST request using fetch
        const res3 = await fetch(process.env.API + `/api/upload`, {
            method: 'POST',
            body: formData,
        });

        const response2 = await res3.json();
        console.log(response2); // Log response2 for debugging purposes

        return response2; // Return the value of response2
    } catch (error) {
        console.error(error);
        return null;
    }
}

