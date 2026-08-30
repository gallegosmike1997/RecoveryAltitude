"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "./Landing.module.css";
import formStyles from "./ConsultationForm.module.css";

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

interface FormData {
  name: string;
  email: string;
  interest: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  interest: "",
  message: "",
};

const interestOptions = [
  "Returning to movement after a pause",
  "Altitude readiness",
  "A specific outdoor objective",
  "Not sure yet — general guidance",
];

export function ConsultationForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const shouldReduceMotion = usePrefersReducedMotion();

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.interest) newErrors.interest = "Please select an area of interest.";
    if (!form.message.trim()) newErrors.message = "Tell us a little about what brings you here.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    const successContent = (
      <>
        <span className={formStyles.successIcon}>✓</span>
        <h3>Thank you, {form.name.split(" ")[0]}.</h3>
        <p>
          Your consultation request has been received. We will respond within two
          business days to map out the next step together.
        </p>
      </>
    );

    return shouldReduceMotion ? (
      <div className={formStyles.success}>{successContent}</div>
    ) : (
      <motion.div
        className={formStyles.success}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {successContent}
      </motion.div>
    );
  }

  return (
    <form className={formStyles.form} onSubmit={handleSubmit} noValidate>
      <div className={formStyles.row}>
        <div className={formStyles.field}>
          <label htmlFor="consult-name">Name</label>
          <input
            id="consult-name"
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={errors.name ? formStyles.inputError : ""}
            placeholder="Your name"
          />
          {errors.name && <span className={formStyles.error}>{errors.name}</span>}
        </div>
        <div className={formStyles.field}>
          <label htmlFor="consult-email">Email</label>
          <input
            id="consult-email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={errors.email ? formStyles.inputError : ""}
            placeholder="you@example.com"
          />
          {errors.email && <span className={formStyles.error}>{errors.email}</span>}
        </div>
      </div>

      <div className={formStyles.field}>
        <label htmlFor="consult-interest">What brings you here?</label>
        <select
          id="consult-interest"
          value={form.interest}
          onChange={(e) => updateField("interest", e.target.value)}
          className={errors.interest ? formStyles.inputError : ""}
        >
          <option value="">Select an area of interest</option>
          {interestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.interest && <span className={formStyles.error}>{errors.interest}</span>}
      </div>

      <div className={formStyles.field}>
        <label htmlFor="consult-message">A little about your situation</label>
        <textarea
          id="consult-message"
          rows={4}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={errors.message ? formStyles.inputError : ""}
          placeholder="What does a steadier return look like for you?"
        />
        {errors.message && <span className={formStyles.error}>{errors.message}</span>}
      </div>

      {submitError && (
        <p className={formStyles.submitError} role="alert">
          {submitError}
        </p>
      )}

      <button type="submit" className={styles.consultationLink} disabled={submitting}>
        {submitting ? "Sending..." : <>Send consultation request <span aria-hidden="true">↗</span></>}
      </button>
    </form>
  );
}
