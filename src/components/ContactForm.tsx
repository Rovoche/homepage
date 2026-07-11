import React, { useState } from "react";

const WEB3FORMS_ACCESS_KEY = "bd07c78c-9c64-4268-9b13-f955cc5d04e9";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-10 space-y-2 animate-fade-in">
        <p className="text-accent font-serif text-xl font-light">Message received.</p>
        <p className="text-stone-300 text-sm font-sans">We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
      <input type="hidden" name="subject" value="New inquiry from the ROVOCHÉ website" />
      <div>
        <label className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1.5 font-sans">
          Name
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full bg-stone-950/60 border border-white/15 rounded-sm px-4 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-accent transition-colors font-sans"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1.5 font-sans">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full bg-stone-950/60 border border-white/15 rounded-sm px-4 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-accent transition-colors font-sans"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1.5 font-sans">
          What are you looking to build?
        </label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full bg-stone-950/60 border border-white/15 rounded-sm px-4 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-accent transition-colors font-sans resize-none"
          placeholder="Tell us a bit about your project"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-xs font-sans">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full text-center text-xs font-sans uppercase tracking-[0.2em] py-4 px-8 bg-accent text-stone-950 hover:brightness-115 active:scale-95 transition-all font-semibold rounded-sm shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Begin Your Project"}
      </button>
    </form>
  );
}
