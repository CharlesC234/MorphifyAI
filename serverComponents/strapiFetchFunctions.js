"use server"

export async function getModelsPrivate(pid) {
    console.log("data: " + pid);
    const res = await fetch(
      process.env.API + `/api/models?populate[0]=profile_pic&filters[pid][$eq]=${pid}`,
      { cache: "no-cache" }
    )
    return res.json();
    }


    export async function fetchStrapiUntilSuccess(id) {
        console.log(id);
        try {
            const response = await fetch(process.env.API + `/api/models/?populate=*&filters[id][$eq]=${id}`, { cache: "no-cache" });
    
            const strapiJson = await response.json();
            console.log('strapi: ' + JSON.stringify(strapiJson));
            console.log(strapiJson.data[0].attributes.lora);
            if (strapiJson.data[0].attributes.lora) {
                // Stop the recursion when status is succeeded
                return strapiJson.data[0].attributes.lora;
            } else {
                // Wait for 60 seconds and then fetch again
                await new Promise(resolve => setTimeout(resolve, 60000));
                // Fetch again recursively
                return fetchStrapiUntilSuccess(id);
            }
        } catch (error) {
            console.error('Error while fetching:', error);
        }
    }