"use server";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import React from "react";
import Popup from "../components/Popup";
import Paywall from "../components/Paywall";
import WelcomeDiscord from "../components/WelcomeDiscord";

async function getEmails() {
  const res = await fetch(process.env.API + "/api/emails?");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Email() {
  const e = await getEmails();
  const emails = [];
  for (let i = 0; i < e.data.length; i++) {
    emails.push(e.data[i].attributes.Email);
  }

  return (
    <>
      <Popup emails={emails} />
      <Paywall emails={emails} />
      <WelcomeDiscord emails={emails}/>
    </>
  );
}
