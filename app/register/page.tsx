"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register, type AuthState } from "@/app/auth-actions";

export default function RegisterPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(register, {});

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border-2 border-border bg-card p-8">
        <h1 className="font-display text-2xl text-primary">Create your account</h1>
        <p className="mt-2 text-foreground/70">Free forever. Your first win starts now.</p>

        <form action={action} className="mt-8 space-y-5">
          {state.error && (
            <p role="alert" className="rounded-lg border border-destructive bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {state.error}
            </p>
          )}
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
            />
            <p className="mt-1.5 text-xs text-foreground/50">At least 8 characters.</p>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="h-12 w-full cursor-pointer rounded-xl bg-primary text-lg font-semibold text-on-primary transition-colors duration-200 hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/70">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
