"use client";

import { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-md bg-surface-container-low rounded-xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col items-center mb-8">
        <h1 className="font-headline text-headline-lg font-bold text-primary mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="font-body text-body-md text-on-surface-variant text-center">
          {isLogin
            ? "Enter your credentials to access the terminal."
            : "Register a new cashier securely."}
        </p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        {!isLogin && (
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-label-md text-on-surface-variant uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. Alex"
              className="w-full bg-surface-highest text-on-surface placeholder:text-on-surface-variant px-4 py-3 rounded-md border-b-2 border-transparent focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-label-md text-on-surface-variant uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            placeholder="cashier@pos.com"
            className="w-full bg-surface-highest text-on-surface placeholder:text-on-surface-variant px-4 py-3 rounded-md border-b-2 border-transparent focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-label-md text-on-surface-variant uppercase tracking-wider">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-surface-highest text-on-surface placeholder:text-on-surface-variant px-4 py-3 rounded-md border-b-2 border-transparent focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full py-3.5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all"
        >
          {isLogin ? "Sign In" : "Register"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="font-body text-body-md text-primary hover:text-primary-fixed transition-colors underline-offset-4 hover:underline"
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}
