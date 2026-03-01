"use client";

import Link from "next/link";

import { Button } from "../../ui/Buttons";
import { Icon } from "../../ui/Icons";
import { Input } from "../../ui/Inputs";

import { useLoginForm } from "./useLoginForm";

export default function LoginLayout() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
    formErrorMessage,
  } = useLoginForm();

  return (
    <section className="w-full max-w-md">
      <div className="glass-card mb-20">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Icon name="brand" size={24} />
          <h1 className="font-bold text-[24px] -ml-2">Planora AI</h1>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">
          JOIN THE FUTURE OF PLANNING
        </h1>

        <form
          className="flex flex-col gap-2 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="email"
            placeholder="Email"
            className={`bg-surface/50 ${
              errors.email ? "border-error! focus:border-error!" : ""
            }`}
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
            })}
          />

          <Input
            type="password"
            placeholder="Password"
            className={`bg-surface/50 ${
              errors.password ? "border-error! focus:border-error!" : ""
            }`}
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />

          <Button
            type="submit"
            className="bg-linear-to-r from-purple-500 to-blue-500 text-white text-[18px]"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log in"}
          </Button>
          {formErrorMessage && (
            <p className="w-full text-sm text-error text-center">
              {formErrorMessage}
            </p>
          )}
          <Link
            href="/signup"
            className="mt-1 text-sm text-white/80 hover:text-white underline underline-offset-2 transition-colors"
          >
            Sign up
          </Link>
        </form>
      </div>
    </section>
  );
}
