// pages/api/gumroad/route.ts
import { NextResponse } from "next/server";

// To handle a POST request to /api
export async function POST(request) {
  try {
    // Parse the JSON data from the request body
    const requestData = await request.text();

    // Log the parsed data
    console.log("data:", requestData);

    // Respond with a JSON message and status 200
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
  } catch (error) {
    console.error("Error processing POST request:", error);

    // Respond with an error message and status 500
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


