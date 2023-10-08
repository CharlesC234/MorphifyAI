"use client";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import ImageLayout from "@/components/ImageLayout";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function legal() {
  const [page, setPage] = useState("TOS");

  return (
    <div class="container">
      <div class="flex mt-5 max-sm:flex-col max-sm:px-1 md:flex-row">
        <div class="w-fit mt-1 me-32">
          <div class="flex-column">
            <button
              data-toggle="button"
              style={{
                paddingLeft: 17.5,
                fontWeight: "700",
                paddingRight: 17.5,
                paddingBottom: 7.5,
                paddingTop: 7.5,
                borderRadius: 10,
              }}
              onClick={() => {
                setPage("TOS");
              }}
              class={`mb-2 whitespace-nowrap flex md:hover:bg-zinc-700 
                ${page == "TOS" ? "bg-pink-500 text-black" : "bg-zinc-800 "}`}
            >
              Terms Of Service
            </button>
            <button
              data-toggle="button"
              style={{
                paddingLeft: 17.5,
                fontWeight: "700",
                paddingRight: 17.5,
                paddingBottom: 7.5,
                paddingTop: 7.5,
                borderRadius: 10,
              }}
              onClick={() => {
                setPage("PP");
              }}
              class={`mb-2 whitespace-nowrap flex md:hover:bg-zinc-700 
              ${page == "PP" ? "bg-pink-500 text-black" : "bg-zinc-800 text-white"}`}
            >
              Policy Privacy
            </button>
            <button
              data-toggle="button"
              style={{
                paddingLeft: 17.5,
                fontWeight: "700",
                paddingRight: 17.5,
                paddingBottom: 7.5,
                paddingTop: 7.5,
                borderRadius: 10,
              }}
              onClick={() => {
                setPage("C");
              }}
              class={`whitespace-nowrap flex md:hover:bg-zinc-700 ${page == "C" ? "bg-pink-500 text-black" : "bg-zinc-800 text-white"}`}
            >
              Cookies Policy
            </button>
          </div>
        </div>
        <div class="w-fit max-sm:mt-5">
          {/* TERMS OF SERVICE*/}
          {/* TERMS OF SERVICE*/}
          {/* TERMS OF SERVICE*/}
          {/* TERMS OF SERVICE*/}
          {/* TERMS OF SERVICE*/}

          <div class={`${page == "TOS" ? "" : "hidden"}`}>
            <div className="mx-auto max-w-5xl pe-10 ">
              <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-sm font-bold mb-2">
                Created at: 6 October 2023
              </p>
              <p className="text-sm font-bold mb-4">
                Updated at: 6 October 2023
              </p>
              <p className="mb-4">
                Please read these Terms of Use carefully before accessing or
                using the services provided by AI Asthetica LLC ("we", "our", or
                "us"). By accessing or using AI Asthetica LLC services, you
                agree to be bound by these Terms of Use. AI Asthetica LLC
                operates the xxxpixels website ("the Site").
              </p>

              <p className="text-2xl font-bold mb-3">Acceptance of Terms</p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-2">
                    Agreement: These Terms of Use constitute a legally binding
                    agreement between you and AI Asthetica LLC. If you do not
                    agree to these terms, you may not access or use AI Asthetica
                    LLC’s services.
                  </p>
                </li>
                <li>
                  <p>
                    Amendments: AI Asthetica LLC reserves the right to modify or
                    update these Terms of Use at any time without prior notice.
                    Any changes will be effective immediately upon posting the
                    revised Terms of Use on AI Asthetica LLC’s website
                    xxxpixels. Your continued use of AI Asthetica LLC’s services
                    after the changes constitutes your acceptance of the
                    modified terms.
                  </p>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">Use of Services</p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-2">
                    Eligibility: Users must be 18 years of age or older to
                    access and use the content on the Site. Upon initial visit,
                    users are required to verify their age.
                  </p>
                </li>
                <li>
                  <p className="mb-2">
                    Non-Commercial Use: AI Asthetica LLC’s services are provided
                    for non-commercial purposes only. You may not use AI
                    Asthetica LLC’s services for any commercial gain. Selling or
                    reselling our services or any related information is
                    strictly prohibited.
                  </p>
                </li>
                <li>
                  <p className="mb-2">
                    Activities: You agree not to engage in any activity that:
                  </p>
                  <ul className="list-disc ml-4 mt-1">
                    <li>
                      Violates any applicable laws, regulations, or third-party
                      rights.
                    </li>
                    <li>
                      Attempts to gain unauthorized access to AI Asthetica LLC’s
                      systems or interfere with the proper functioning of AI
                      Asthetica LLC’s services.
                    </li>
                    <li>
                      Uses AI Asthetica LLC’s services to transmit or distribute
                      any viruses, malware, or other harmful content.
                    </li>
                    <li>
                      Harasses, threatens, or abuses other users or individuals
                      in any manner.
                    </li>
                    <li>
                      Engages in spamming, phishing, or any other form of
                      unsolicited communications.
                    </li>
                    <li>
                      Collects or harvests any personal information from AI
                      Asthetica LLC’s services without proper consent.
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Continue with other sections */}
              <p className="text-2xl font-bold mb-2 mb-3">User Data</p>
              <ul className="list-disc ml-4 mb-4 mb-4">
                <li className="mb-2">
                  <p>
                    User Emails: We collect user emails solely for the purpose
                    of notifying users about updates, new additions, and other
                    notifications related to the Site. As a user, entering an
                    email is completely optional. We do not engage in the
                    selling of user data (user emails) please look at our
                    privacy policy and cookies policy for more information about
                    the data xxxpixels collects and the reasons for it.
                  </p>
                </li>
                <li>
                  <p>
                    Upvoting and Downvoting: Users may upvote or downvote
                    images. The Site does not track or store information about
                    who upvoted or downvoted specific images.
                  </p>
                </li>
              </ul>

              {/* Continue with other sections */}
              <p className="text-2xl font-bold mb-3">Intellectual Property</p>
              <ul className="list-disc ml-4 mb-4">
                <li className="mb-2">
                  <p>
                    Ownership: All content on the Site, including but not
                    limited to logos, trademarks, texts, images, and software,
                    is protected by intellectual property laws and is the
                    property of AI Asthetica LLC.
                  </p>
                </li>
                <li>
                  <p>
                    Limited License: Subject to these Terms of Use, AI Asthetica
                    LLC grants you a limited, non-exclusive, non-transferable,
                    and revocable license to access and use AI Asthetica LLC's
                    services for personal, non-commercial purposes. You may not
                    reproduce, modify, distribute, or create derivative works of
                    any part of AI Asthetica LLC's services without prior
                    written consent from AI Asthetica LLC.
                  </p>
                </li>
              </ul>

              {/* Continue with other sections */}
              <p className="text-2xl font-bold mb-3">Limitation of Liability</p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-4">
                    We are not liable for any direct, indirect, incidental,
                    special, or consequential damages arising out of or in any
                    way connected with your use of AI Asthetica LLC's services,
                    even if advised of the possibility of such damages..
                  </p>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">Changes to the Terms</p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-4">
                    We reserve the right to update or modify these Terms at any
                    time. The date of the latest revision will be indicated at
                    the beginning of the Terms.
                  </p>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">
                Governing Law and Jurisdiction
              </p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-4">
                    These Terms of Use shall be governed by and construed in
                    accordance with the laws of the jurisdiction where AI
                    Asthetica LLC is based (United States of America). Any
                    disputes arising out of or in connection with these Terms of
                    Use shall be submitted to the exclusive jurisdiction of the
                    courts in that jurisdiction.
                  </p>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">Contact Us</p>
              <ul className="list-disc ml-4">
                <li>
                  <p>
                    If you have any questions or concerns regarding these Terms,
                    please contact us at{" "}
                    <a
                      href="mailto:aiaestheticallc@gmail.com"
                      className="text-blue-500"
                    >
                      aiaestheticallc@gmail.com
                    </a>
                    .
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* PRIVACY POLICY*/}
          {/* PRIVACY POLICY*/}
          {/* PRIVACY POLICY*/}
          {/* PRIVACY POLICY*/}
          {/* PRIVACY POLICY*/}

          <div class={`${page == "PP" ? "" : "hidden"}`}>
            <div className="mx-auto max-w-5xl pe-10 ">
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-sm font-bold mb-2">
                Created at: 6 October 2023
              </p>
              <p className="text-sm font-bold mb-4">
                Updated at: 6 October 2023
              </p>
              <p className="mb-4">
                This Privacy Policy describes how AI Asthetica LLC ("we", "our",
                or "us") collects, uses, and protects your personal information
                when you visit and use the website xxxpixels ("the Site"). By
                using the Site, you consent to the practices described in this
                Privacy Policy.
              </p>

              <p className="text-2xl font-bold mb-3">Information We Collect</p>
              <p className="mb-2">
                We collect and store the following information:
              </p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-2 font-bold">User emails</p>
                  <ul className="list-disc ml-4 mb-2">
                    <li>
                      <p>
                        User emails are Provided voluntarily for notifications
                        regarding updates, new additions, and other
                        notifications related to the Site.
                      </p>
                    </li>
                  </ul>
                </li>
                <li>
                  <p className="mb-2 font-bold">Upvotes and Downvotes</p>
                  <ul className="list-disc ml-4 mb-2">
                    <li>
                      <p>
                        We collect upvotes and downvotes on the site in order to
                        create a better user experience by attempting to show
                        users the best content for them. Upvotes and Downvotes
                        are completely anonymous, meaning the site does not
                        collect data on which user upvoted or downvoted a
                        specific image, only that the value was incremented or
                        decremented.
                      </p>
                    </li>
                  </ul>
                </li>
                <li>
                  <p className="mb-2 font-bold">Cookies</p>
                  <ul className="list-disc ml-4">
                    <li>
                      <p className="mb-2">
                        We use cookies and local storage to determine whether a
                        user has previously visited the Site. This allows us to
                        prompt users to verify their age and enter their email
                        (optional) or dismiss pop-ups on subsequent visits. No
                        other data is collected through cookies or local
                        storage.
                      </p>
                    </li>
                    <li>
                      <p className="mb-2">
                        The site also uses cookies to analyze how visitors
                        interact with AI Asthetica LLC's website, track user
                        behavior, and gather statistical information. This will
                        help us improve the performance and effectiveness of AI
                        Asthetica LLC's website.
                      </p>
                    </li>
                  </ul>
                </li>
                <li>
                  <p className="mb-2 font-bold">Other Data</p>
                  <p className="mb-2">
                    We may also collect information that your browser sends
                    whenever you visit our Service or when you access the
                    Service by or through a mobile device.
                  </p>
                  <ul className="list-disc ml-4 mb-4">
                    <li className="mb-2">
                      <p>
                        Usage Data may include information such as your
                        computer's Internet Protocol address (e.g. IP address),
                        browser type, browser version, the pages of our Service
                        that you visit, the time and date of your visit, the
                        time spent on those pages, unique device identifiers and
                        other diagnostic data.
                      </p>
                    </li>
                    <li className="mb-2">
                      <p>
                        When you access the Service by or through a mobile
                        device, we may collect certain information
                        automatically, including, but not limited to, the type
                        of mobile device you use, your mobile device unique ID,
                        the IP address of your mobile device, your mobile
                        operating system, the type of mobile Internet browser
                        you use, unique device identifiers and other diagnostic
                        data.
                      </p>
                    </li>
                    <li className="mb-2">
                      <p>
                        We may also collect information that your router or
                        server may make available, such as an IP address, the
                        time of your request, and more information about the way
                        you use our Service.
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">Use of Information</p>
              <ul className="list-disc ml-4 mb-4">
                <li className="mb-2">
                  <p>
                    We collect different types of user data to provide and
                    maintain the Service To notify you about changes to our
                    Service To allow you to participate in interactive features
                    of our Service when you choose to do so To provide customer
                    care and support To gather analysis or valuable information
                    so that we improve the Service To monitor the usage of the
                    Service
                  </p>
                </li>
                <li className="mb-2">
                  <p>
                    AI Asthetica LLC will take all steps reasonably necessary to
                    ensure that your data is treated securely and in accordance
                    with this Privacy Policy and no transfer of your Personal
                    Data will take place to an organization or a country unless
                    there are adequate controls in place.
                  </p>
                </li>
                <li>
                  <p className="mb-2">
                    We use the following collected information for the following
                    purposes:
                  </p>
                  <ul className="list-disc ml-4 mt-1">
                    <li className="mb-2">
                      Emails: To notify users about updates, new additions, and
                      other notifications related to the Site.
                    </li>
                    <li>
                      Upvotes and Downvotes: to create a better user experience
                      by attempting to show users the best content for them.
                      Images are sorted by (upvotes)-(downvotes) on both the
                      models pages and home page.
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Continue with other sections */}
              <p className="text-2xl font-bold mb-2 mb-3">
                Sharing of Information
              </p>
              <ul className="list-disc ml-4 mb-4 mb-4">
                <li>
                  <p>
                    We do not share, sell, or disclose user emails or any user
                    data to third parties.
                  </p>
                </li>
              </ul>

              {/* Continue with other sections */}
              <p className="text-2xl font-bold mb-3">
                Cookies and Local Storage
              </p>
              <ul className="list-disc ml-4 mb-4">
                <li className="mb-2">
                  <p>
                    We use cookies and local storage to determine whether a user
                    has previously visited the Site. This allows us to prompt
                    users to verify their age and enter their email (optional)
                    or dismiss pop-ups on subsequent visits.{" "}
                  </p>
                </li>
                <li>
                  <p>
                    The site uses cookies to analyze how visitors interact with
                    AI Asthetica LLC's website, track user behavior, and gather
                    statistical information. This will help us improve the
                    performance and effectiveness of AI Asthetica LLC's website.
                  </p>
                </li>
              </ul>

              {/* Continue with other sections */}
              <p className="text-2xl font-bold mb-3">Age Verification</p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-4">
                    Upon initial visit, users are required to verify their age
                    by clicking a "Yes, I am 18" button to dismiss the pop-up.
                    By accessing and using the site xxxpixels, you represent and
                    warrant that you are at least 18 years of age.
                  </p>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">Security</p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-4">
                    We implement industry-standard security measures to protect
                    against unauthorized access, alteration, disclosure, or
                    destruction of your personal information.
                  </p>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">Changes To This Policy</p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-4">
                    We reserve the right to update or modify this Privacy Policy
                    at any time. The date of the latest revision will be
                    indicated at the beginning of the policy.
                  </p>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">Contact Us</p>
              <ul className="list-disc ml-4">
                <li>
                  <p>
                    If you have any questions or concerns regarding these Terms,
                    please contact us at{" "}
                    <a
                      href="mailto:aiaestheticallc@gmail.com"
                      className="text-blue-500"
                    >
                      aiaestheticallc@gmail.com
                    </a>
                    .
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* COOKIES POLICY*/}
          {/* COOKIES POLICY*/}
          {/* COOKIES POLICY*/}
          {/* COOKIES POLICY*/}
          {/* COOKIES POLICY*/}

          <div class={`${page == "C" ? "" : "hidden"}`}>
            <div className="mx-auto max-w-5xl pe-10 ">
              <h1 className="text-4xl font-bold mb-4">Cookies Policy</h1>
              <p className="text-sm font-bold mb-2">
                Created at: 6 October 2023
              </p>
              <p className="text-sm font-bold mb-4">
                Updated at: 6 October 2023
              </p>
              <p className="mb-4">
                This Cookies Policy explains how AI Asthetica LLC ("we", "our",
                or "us") uses cookies and local storage on the website xxxpixels
                ("the Site"). By using the Site, you consent to our use of
                cookies in accordance with this policy.
              </p>

              <p className="text-2xl font-bold mb-3">What Are Cookies?</p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p>
                    Cookies are small text files stored on your device's
                    browser. Local storage performs a similar function. They are
                    used to recognize and remember your preferences or
                    activities.
                  </p>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">How We Use Cookies</p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-2">
                    We use cookies and local storage for the purpose of
                    determining whether a user has previously visited the Site.
                    This helps in prompting users to verify their age and enter
                    their email (optional) or dismiss pop-ups on subsequent
                    visits.
                  </p>
                </li>
                <li>
                  <p>
                    The site uses cookies to analyze how visitors interact with
                    AI Asthetica LLC's website, track user behavior, and gather
                    statistical information. This will help us improve the
                    performance and effectiveness of AI Asthetica LLC's website.
                  </p>
                </li>
              </ul>

              {/* Continue with other sections */}
              <p className="text-2xl font-bold mb-2 mb-3">Managing Cookies</p>
              <ul className="list-disc ml-4 mb-4 mb-4">
                <li className="mb-2">
                  <p>
                    Cookie Consent: By continuing to use AI Asthetica LLC's
                    website (xxpixels), you consent to the use of cookies as
                    described in this policy. You may withdraw your consent or
                    manage your cookie preferences by adjusting your browser
                    settings. However, please note that disabling or blocking
                    certain cookies may impact the functionality and performance
                    of AI Asthetica LLC’s website.
                  </p>
                </li>
                <li>
                  <p>
                    Browser Settings: Most web browsers allow you to control
                    cookies through their settings. You can typically find
                    instructions in the "Help" or "Settings" section of your
                    browser. Please be aware that changing your cookie
                    preferences may affect how AI Asthetica LLC’s website
                    functions.
                  </p>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">Changes To This Policy</p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-4">
                    We may update this Cookies Policy from time to time. The
                    date of the latest revision will be indicated at the
                    beginning of the policy.
                  </p>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">
                Data Security And Privacy
              </p>
              <ul className="list-disc ml-4 mb-4">
                <li>
                  <p className="mb-4">
                    AI Asthetica LLC is committed to protecting your personal
                    information and handling it in accordance with applicable
                    privacy laws. For information about how we collect, use, and
                    protect your personal data, please refer to AI Asthetica
                    LLC’s Privacy Policy.
                  </p>
                </li>
              </ul>

              <p className="text-2xl font-bold mb-3">Contact Us</p>
              <ul className="list-disc ml-4">
                <li>
                  <p>
                    If you have any questions or concerns regarding the cookies
                    policy, please contact us at{" "}
                    <a
                      href="mailto:aiaestheticallc@gmail.com"
                      className="text-blue-500"
                    >
                      aiaestheticallc@gmail.com
                    </a>
                    .
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
