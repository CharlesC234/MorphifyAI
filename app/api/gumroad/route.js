// pages/api/gumroad/route.ts
import { NextResponse } from "next/server";

// To handle a POST request to /api
export async function POST(req) {
  // Do whatever you want
  var POST = {};
    if (req.method == 'POST') {
        req.on('data', function(data) {
            data = data.toString();
            data = data.split('&');
            for (var i = 0; i < data.length; i++) {
                var _data = data[i].split("=");
                POST[_data[0]] = _data[1];
            }
            console.log(POST);
        })
    }
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

