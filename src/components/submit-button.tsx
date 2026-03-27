"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
};

export function SubmitButton({ label }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Sending enquiry..." : label}
    </button>
  );
}
