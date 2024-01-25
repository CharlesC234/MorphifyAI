import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";


import Generate from "./generate";

async function getFields() {
  const res = await fetch(process.env.API + "/api/fields?populate=*", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function generatePage({}) {
  const fields = await getFields();
  return (
    <div>
      <Generate fields={fields.data} />
    </div>
  );
}
