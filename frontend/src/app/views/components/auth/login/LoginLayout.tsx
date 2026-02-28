"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../ui/Buttons";
import { Icon } from "../../ui/Icons";
import { Input } from "../../ui/Inputs";

import { loginRequest, type LoginRequest } from "@/lib/api/modules";
import { useAuthStore } from "@/stores/authStore";

export default function LoginLayout() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    resetField,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuthStore();
  const loginMutation = useMutation({
    mutationFn: loginRequest,
  });

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    clearErrors("root");

    try {
      const result = await loginMutation.mutateAsync(data);

      login({
        user: result.user,
        token: result.token,
      });
      router.replace("/");
    } catch (error) {
      resetField("password");
      setError("root", {
        message:
          error instanceof Error ? error.message : "Server connection failed",
      });
    }
  };

  const formErrorMessage =
    errors.email?.message || errors.password?.message || errors.root?.message;

  return (
    <section className="w-full max-w-md">
      <div className="glass-card">
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
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </Button>
          {formErrorMessage && (
            <p className="w-full text-xs text-error text-center">
              {formErrorMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
