"use server";

  export async function getUserData(accessToken) {
    try {
      const response = await fetch(encodeURI('https://discord.com/api/oauth2/@me'), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error fetching Patreon user info');
      }
  
      const data = await response.json(); // await the JSON parsing
      return data.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

  export async function getUserDataStrapi(pid){
    const res = await fetch(process.env.API + `/api/discord-users?populate=*&filters[pid][$eq]=${pid}`, {
      cache: "no-store",
    })
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  
  