"use server";

export async function sendImage(prompt) {
  if (!prompt) prompt = "1girl";
  const res = await fetch(process.env.SD_API, {
    method: "POST",
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.SD_KEY,
    },
    body: JSON.stringify({
      input: {
        prompt: prompt,
        negative_prompt: "FastNegativeV2, bad-hands-5,",
        width: 720,
        height: 1080,
        seed: 2517236928,
        steps: 50,
      },
    }),
  });

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const final = await res.json();

  return final;
}
