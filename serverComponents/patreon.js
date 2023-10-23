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
      const response = await fetch(encodeURI('https://www.patreon.com/api/oauth2/v2/identity?fields[user]=first_name,email,full_name'), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error fetching Patreon user info');
      }
  
      const data = await response.json();
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  