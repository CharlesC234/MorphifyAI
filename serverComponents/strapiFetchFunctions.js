"use server"

export async function getModelsPrivate(pid) {
    console.log("data: " + pid);
    const res = await fetch(
      process.env.API + `/api/models?populate[0]=profile_pic&filters[pid][$eq]=${pid}`,
      { cache: "no-cache" }
    )
    return res.json();
  }