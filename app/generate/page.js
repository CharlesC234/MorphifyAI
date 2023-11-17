"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";

export default function Generate() {
  async function sendRequest() {
    const data = await fetch("/generate/api", { method: "POST" });
    console.log(data);
  }
  return (
    <div class="container">
      <img src={""} />

      <input placeholder="enter prompt here" id="prompt" name="prompt"></input>
      <button
        type="submit"
        class="btn btn-primary"
        onClick={() => sendRequest()}
      >
        Generate
      </button>
    </div>
  );
}
