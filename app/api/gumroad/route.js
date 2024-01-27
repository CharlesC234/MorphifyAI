// pages/api/gumroad/route.ts
import { NextResponse } from "next/server";
import querystring from "querystring";

// To handle a POST request to /api
export async function POST(request) {
  try {
    // Parse the JSON data from the request body
    const rawData = await request.text();
    const requestData = querystring.parse(rawData);
    // Log the parsed data
    console.log('raw-data:' + rawData);
    console.log("data:", requestData);
    console.log("url-params:", requestData.url_params);
    //check seller id from POST with our seller id to verify
    if(requestData.seller_id == process.env.GUMROAD_SELLER_ID){
      //if valid, send PUT request to strapi to set user as premium
      //should put user pid as url param and verify as well as use user id in strapi?


      // fetch(process.env.API + `/api/discord-users${requestData.}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     data: {
      //       Premium: false,
      //     },
      //   }),
      // });
    }

    // Respond with a JSON message and status 200
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
  } catch (error) {
    console.error("Error processing POST request:", error);

    // Respond with an error message and status 500
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


