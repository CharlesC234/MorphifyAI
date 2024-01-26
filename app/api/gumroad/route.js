// pages/api/gumroad/route.ts
import { NextResponse } from "next/server";

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  fetch(process.env.API + `/api/discord-users/17`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        Email: "success@gmail.com",
      },
    }),
  });
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

