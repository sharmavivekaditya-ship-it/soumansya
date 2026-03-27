"use server";

import { prisma } from "@/lib/prisma";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitLeadAction(
  _previousState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const rawPhone = String(formData.get("phone") ?? "").trim();
  const phone = rawPhone.replace(/[^\d+]/g, "");
  const inquiryType = String(formData.get("inquiryType") ?? "").trim();
  const urgency = String(formData.get("urgency") ?? "").trim();
  const preferredContact = String(
    formData.get("preferredContact") ?? "",
  ).trim();
  const preferredTime = String(formData.get("preferredTime") ?? "").trim();
  const serviceInterest = String(formData.get("serviceInterest") ?? "").trim();
  const locationPreference = String(
    formData.get("locationPreference") ?? "",
  ).trim();
  const sourcePage = String(formData.get("sourcePage") ?? "").trim();
  const referrer = String(formData.get("referrer") ?? "").trim();
  const consentToContact = formData.get("consentToContact") === "on";
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length < 2) {
    return {
      status: "error",
      message: "Please enter your full name.",
    };
  }

  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return {
      status: "error",
      message: "Please enter a valid phone number.",
    };
  }

  if (message.length > 1200) {
    return {
      status: "error",
      message: "Please shorten your message to 1200 characters or fewer.",
    };
  }

  if (!consentToContact) {
    return {
      status: "error",
      message: "Please confirm that the clinic can contact you back.",
    };
  }

  try {
    await prisma.lead.create({
      data: {
        name,
        email: email || null,
        phone,
        inquiryType: inquiryType || null,
        urgency: urgency || null,
        preferredContact: preferredContact || null,
        preferredTime: preferredTime || null,
        serviceInterest: serviceInterest || null,
        locationPreference: locationPreference || null,
        sourcePage: sourcePage || null,
        referrer: referrer || null,
        consentToContact,
        message: message || null,
      },
    });

    return {
      status: "success",
      message:
        "Your enquiry has been saved with its urgency and contact preferences. The clinic can now follow up on the right channel.",
    };
  } catch (error) {
    console.error("Lead capture failed", error);

    return {
      status: "error",
      message:
        "We could not save your enquiry just now. Please call the clinic directly at +91 70215 53187.",
    };
  }
}
