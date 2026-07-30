"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 pt-16 pb-20">
      <h1 className="font-display font-semibold text-3xl md:text-4xl mb-4 text-navy">Get in touch</h1>
      <p className="text-slate text-lg mb-10">
        Questions about a score, a plan, or something broken — we read every message.
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          {sent ? (
            <div className="rounded-xl p-6 bg-white border border-slate/15">
              <p className="font-medium text-navy mb-1">Message received.</p>
              <p className="text-sm text-slate">We'll get back to you within a couple of days.</p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                // Wire this up to an email service or API route once the backend exists.
                setSent(true);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Name</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-lg border border-slate/25 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
                <input
                  required
                  type="email"
                  className="w-full rounded-lg border border-slate/25 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full rounded-lg border border-slate/25 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
                />
              </div>
              <button type="submit" className="text-sm font-semibold px-6 py-3 rounded-lg bg-navy text-white">
                Send message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-xl p-5 bg-white border border-slate/15">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} className="text-navy" />
              <span className="font-medium text-navy text-sm">Email</span>
            </div>
            <p className="text-sm text-slate">hello@bandmark.example</p>
          </div>
          <div className="rounded-xl p-5 bg-white border border-slate/15">
            <p className="text-sm text-slate">Most replies go out within 2 business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
