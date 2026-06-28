"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.replace("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8 shadow-glass-lg"
      >
        <h1 className="text-center font-display text-2xl font-semibold text-ink">
          Print<span className="text-magenta">Magic</span>{" "}
          <span className="text-ink/40">Admin</span>
        </h1>
        <p className="mt-1 text-center font-body text-xs text-ink/50">
          Sign in to manage products &amp; banners
        </p>

        <div className="mt-6 space-y-3">
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-ink/10 px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-magenta"
          />
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-ink/10 px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-magenta"
          />
        </div>

        {error && (
          <p className="mt-3 font-body text-xs text-red">{error}</p>
        )}

        <button
          disabled={loading}
          type="submit"
          className="mt-5 w-full rounded-xl bg-ink py-2.5 font-body text-sm font-semibold text-white transition hover:bg-magenta disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="mt-4 text-center font-body text-[11px] text-ink/40">
          Admin accounts are created in your Supabase dashboard — see the
          README.
        </p>
      </form>
    </div>
  );
}
