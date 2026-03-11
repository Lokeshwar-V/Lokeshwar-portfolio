"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const EmailSection = () => {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    const payload = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.error || "Unable to send message right now.");
      }

      setStatus({ type: "success", message: "Email sent successfully." });
      e.target.reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to send message." });
    }
  };

  return (
    <section id="contact" className="relative py-16">
      <h2 className="section-title mb-8 text-white">
        Let&apos;s <span className="neon-text">Connect</span>
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6 md:p-8">
          <p className="mb-5 text-sm leading-relaxed text-slate-300 md:text-base">
            I am actively looking for Data Engineer roles and impactful AI/data platform projects.
            If you have an opportunity or collaboration idea, let&apos;s talk.
          </p>

          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <span className="font-semibold text-white">Email:</span> lokeshwar_v@yahoo.com
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-white">Phone:</span>
              {!isPhoneVisible ? (
                <button
                  type="button"
                  onClick={() => setIsPhoneVisible(true)}
                  aria-expanded={isPhoneVisible}
                  className="rounded-full border border-slate-500/50 bg-slate-800/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:border-sky-300/60 hover:text-sky-100"
                >
                  Tap To Reveal
                </button>
              ) : (
                <a
                  href="tel:+919578692037"
                  className="animate-pulse rounded-full border border-emerald-400/45 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition hover:border-emerald-300/70 hover:text-emerald-100"
                >
                  +91 95786 92037
                </a>
              )}
            </div>
            <p>
              <span className="font-semibold text-white">Location:</span> Chennai, India
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://github.com/Lokeshwar-V"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600/60 px-4 py-2 text-sm text-slate-200 transition hover:border-secondary-400"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/lokeshwar-v-017a1b142/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600/60 px-4 py-2 text-sm text-slate-200 transition hover:border-secondary-400"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card space-y-5 p-6 md:p-8">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
              Your Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              className="w-full rounded-lg border border-slate-600/60 bg-slate-900/60 p-3 text-sm text-slate-100 outline-none transition focus:border-secondary-400"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-200">
              Subject
            </label>
            <input
              name="subject"
              type="text"
              id="subject"
              required
              className="w-full rounded-lg border border-slate-600/60 bg-slate-900/60 p-3 text-sm text-slate-100 outline-none transition focus:border-secondary-400"
              placeholder="Opportunity discussion"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={5}
              className="w-full rounded-lg border border-slate-600/60 bg-slate-900/60 p-3 text-sm text-slate-100 outline-none transition focus:border-secondary-400"
              placeholder="Tell me about the role/project"
            />
          </div>

          <button
            type="submit"
            disabled={status.type === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-900 to-emerald-900 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <EnvelopeIcon className="h-5 w-5" />
            {status.type === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status.type !== "idle" && (
            <p
              className={`text-sm ${
                status.type === "success"
                  ? "text-emerald-400"
                  : status.type === "error"
                  ? "text-red-400"
                  : "text-slate-300"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
