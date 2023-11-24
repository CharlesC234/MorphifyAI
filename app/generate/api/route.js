export async function POST() {
  console.log("called");
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
        prompt:
          "1girl, 18 years old, beautiful japanese woman, famous japanese idol, kawaii,",
        negative_prompt: "FastNegativeV2, bad-hands-5,",
        width: 720,
        height: 1080,
        seed: 2517236928,
        steps: 50,
      },
    }),
  })
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return res.json();
}
