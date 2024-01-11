"use server";

import { redirect } from "next/navigation";

import { sendImage } from "../../serverComponents/generateImage";

export default async function createImage(formData, prompt) {
  const result = await sendImage(prompt);

  console.log(result);
  console.log({ prompt });

  if (result != null) {
    return result.images.url;
  }
}
