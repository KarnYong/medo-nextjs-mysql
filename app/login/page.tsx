"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type AuthState } from "@/app/auth-actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(login, {});

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border-2 border-border bg-card p-8">
        <h1 className="font-display text-2xl text-primary">Welcome back</h1>
        <p className="mt-2 text-foreground/70">Log in to keep your streak alive.</p>

        <form action={action} className="mt-8 space-y-5">
          {state.error && (
            <p role="alert" className="rounded-lg border border-destructive bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {state.error}
            </p>
          )}
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
              autoComplete="current-password"
              className="w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="h-12 w-full cursor-pointer rounded-xl bg-primary text-lg font-semibold text-on-primary transition-colors duration-200 hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/70">
          No account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </p>
        <p className="mt-3 text-center text-xs text-foreground/50">
          Demo: demo@medo.app / password123
        </p>
      </div>
    </div>
  );
}
