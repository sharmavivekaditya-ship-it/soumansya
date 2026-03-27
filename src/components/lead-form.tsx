"use client";

import { useActionState, useEffect, useMemo, useRef } from "react";
import { submitLeadAction, type LeadFormState } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { siteConfig } from "@/lib/site";

type LeadFormProps = {
  services: Array<{ slug: string; title: string }>;
  locations: Array<{ slug: string; name: string }>;
  sourcePage: string;
  lockedService?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  compact?: boolean;
};

type StoredLeadDraft = {
  name?: string;
  phone?: string;
  email?: string;
  inquiryType?: string;
  urgency?: string;
  preferredContact?: string;
  preferredTime?: string;
  serviceInterest?: string;
  locationPreference?: string;
  message?: string;
  consentToContact?: string;
};

const initialState: LeadFormState = {
  status: "idle",
  message: "",
};

function setFieldValue(
  form: HTMLFormElement,
  name: keyof StoredLeadDraft | "sourcePage" | "referrer",
  value: string,
) {
  const field = form.elements.namedItem(name);
  if (!field) {
    return;
  }

  if (field instanceof HTMLInputElement) {
    if (field.type === "checkbox") {
      field.checked = value === "true" || value === "on";
      return;
    }

    field.value = value;
    return;
  }

  if (field instanceof HTMLTextAreaElement) {
    field.value = value;
    return;
  }

  if (field instanceof HTMLSelectElement) {
    field.value = value;
  }
}

export function LeadForm({
  services,
  locations,
  sourcePage,
  lockedService,
  title = "Request an appointment",
  subtitle = "Share a few details and the clinic can follow up for the right consultation.",
  ctaLabel = "Book consultation",
  compact = false,
}: LeadFormProps) {
  const [state, formAction] = useActionState(submitLeadAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const storageKey = useMemo(
    () => `lead-form:${lockedService ?? "general"}:${sourcePage}`,
    [lockedService, sourcePage],
  );

  useEffect(() => {
    const form = formRef.current;
    if (!form) {
      return;
    }

    const savedDraft = window.localStorage.getItem(storageKey);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft) as StoredLeadDraft;

        for (const [fieldName, fieldValue] of Object.entries(parsedDraft)) {
          if (typeof fieldValue === "string") {
            setFieldValue(
              form,
              fieldName as keyof StoredLeadDraft,
              fieldValue,
            );
          }
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }

    setFieldValue(form, "sourcePage", sourcePage);
    setFieldValue(form, "referrer", document.referrer || "");

    if (lockedService) {
      setFieldValue(form, "serviceInterest", lockedService);
    }
  }, [lockedService, sourcePage, storageKey]);

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    window.localStorage.removeItem(storageKey);
  }, [state.status, storageKey]);

  function handleInputCapture() {
    const form = formRef.current;
    if (!form) {
      return;
    }

    const formData = new FormData(form);
    const draft: StoredLeadDraft = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      inquiryType: String(formData.get("inquiryType") ?? ""),
      urgency: String(formData.get("urgency") ?? ""),
      preferredContact: String(formData.get("preferredContact") ?? ""),
      preferredTime: String(formData.get("preferredTime") ?? ""),
      serviceInterest: String(formData.get("serviceInterest") ?? ""),
      locationPreference: String(formData.get("locationPreference") ?? ""),
      message: String(formData.get("message") ?? ""),
      consentToContact: formData.get("consentToContact") ? "true" : "false",
    };

    window.localStorage.setItem(storageKey, JSON.stringify(draft));
  }

  return (
    <div className={`section-card relative overflow-hidden ${compact ? "p-6" : "p-7 sm:p-8"}`}>
      <div className="pointer-events-none absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full bg-[rgba(28,139,128,0.12)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-[-2rem] left-[-1rem] h-24 w-24 rounded-full bg-[rgba(216,127,88,0.12)] blur-2xl" />
      <div className="relative mb-6 space-y-3">
        <p className="eyebrow">Lead capture</p>
        <h3 className="font-display text-3xl leading-none text-[var(--foreground)]">
          {title}
        </h3>
        <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="lead-pill">{lockedService || "Private enquiry"}</span>
          <span className="lead-pill">Preferred callback</span>
          <span className="lead-pill">Branch routing</span>
        </div>
      </div>

      <form
        key={state.status === "success" ? state.message : "form"}
        ref={formRef}
        action={formAction}
        onInputCapture={handleInputCapture}
        className="grid gap-4 md:grid-cols-2"
      >
        <input type="hidden" name="sourcePage" defaultValue={sourcePage} />
        <input type="hidden" name="referrer" defaultValue="" />

        {lockedService ? (
          <input type="hidden" name="serviceInterest" value={lockedService} readOnly />
        ) : (
          <label className="space-y-2 text-sm font-medium text-[var(--foreground)] md:col-span-2">
            Service needed
            <select name="serviceInterest" defaultValue="">
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
          Full name
          <input name="name" type="text" placeholder="Your name" required />
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
          Phone number
          <input name="phone" type="tel" placeholder="+91" required />
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
          Inquiry type
          <select name="inquiryType" defaultValue="">
            <option value="">Select inquiry type</option>
            <option value="First consultation">First consultation</option>
            <option value="Second opinion">Second opinion</option>
            <option value="Child assessment">Child assessment</option>
            <option value="Therapy support">Therapy support</option>
            <option value="Home visit request">Home visit request</option>
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
          Urgency
          <select name="urgency" defaultValue="">
            <option value="">Select urgency</option>
            <option value="Need a callback today">Need a callback today</option>
            <option value="Need an appointment this week">
              Need an appointment this week
            </option>
            <option value="Flexible timeline">Flexible timeline</option>
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
          Preferred contact
          <select name="preferredContact" defaultValue="">
            <option value="">Select contact mode</option>
            <option value="Phone call">Phone call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
          Preferred time
          <select name="preferredTime" defaultValue="">
            <option value="">Select a preferred time</option>
            <option value="Afternoon, 1 PM to 4 PM">Afternoon, 1 PM to 4 PM</option>
            <option value="Evening, 7 PM to 9 PM">Evening, 7 PM to 9 PM</option>
            <option value="Any available slot">Any available slot</option>
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
          Email address
          <input name="email" type="email" placeholder="you@example.com" />
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
          Preferred location
          <select name="locationPreference" defaultValue="">
            <option value="">Any clinic location</option>
            {locations.map((location) => (
              <option key={location.slug} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-[var(--foreground)] md:col-span-2">
          Message
          <textarea
            name="message"
            rows={compact ? 4 : 5}
            placeholder="Tell the clinic what support you need."
          />
        </label>

        <label className="lead-consent md:col-span-2">
          <input name="consentToContact" type="checkbox" />
          <span>
            I want the clinic to contact me back on my preferred channel.
          </span>
        </label>

        <div className="lead-status md:col-span-2">
          <div className={`text-sm ${state.status === "error" ? "text-[#a64630]" : "text-[var(--muted)]"}`}>
            {lockedService
              ? `This enquiry will be tagged under ${lockedService}.`
              : "The form remembers progress in this browser, so incomplete enquiries are not lost."}
          </div>
          <SubmitButton label={ctaLabel} />
        </div>

        {state.message ? (
          <div className="lead-feedback md:col-span-2">
            <p
              className={`text-sm ${
                state.status === "success" ? "text-[#1b6b63]" : "text-[#a64630]"
              }`}
            >
              {state.message}
            </p>
            {state.status === "success" ? (
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={`tel:${siteConfig.phoneRaw}`} className="btn-secondary">
                  Call now
                </a>
                <a
                  href={`https://wa.me/${siteConfig.phoneRaw.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  WhatsApp now
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </form>
    </div>
  );
}
