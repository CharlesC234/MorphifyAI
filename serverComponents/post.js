"use server"


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