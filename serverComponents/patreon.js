"use server";
export async function checkPatreonMembership(accessToken){
    try {
      await fetch('https://www.patreon.com/api/oauth2/api/current_user/memberships', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
            // Check if the user is a patron of your page
      const memberships = res.data.data;
      const isPatron = memberships.some(membership => membership.relationship_ids.campaign === process.env.PATREON_CAMPAIGN_ID);
  
      return isPatron;
      })
    } catch (error) {
      return false;
    }
  };

  export async function getUserData(accessToken) {
    try {
      const response = await fetch(encodeURI('https://www.patreon.com/api/oauth2/v2/identity?fields[user]=first_name,last_name,email,full_name'), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error fetching Patreon user info');
      }
  
      const data = await response.json(); // await the JSON parsing
      return data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

  export async function getUserDataStrapi(accessToken){
    const res = await fetch(process.env.API + `/api/patreon-users?populate=*&filters[Patreon_Access_Token][$eq]=${accessToken}`, {
      cache: "no-store",
    })
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  
  