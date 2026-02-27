"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../ui/Buttons";
import { Icon } from "../../ui/Icons";
import { Input } from "../../ui/Inputs";

import { useAuthStore } from "@/stores/authStore";

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

async function loginRequest(data: LoginFormValues): Promise<LoginResponse> {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

  const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = (await response.json()) as { message?: string };
    throw new Error(errorBody.message ?? "Login failed");
  }

  return (await response.json()) as LoginResponse;
}

export default function LoginLayout() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuthStore();
  const loginMutation = useMutation({
    mutationFn: loginRequest,
  });

  const handleLogin: SubmitHandler<LoginFormValues> = async (data) => {
    clearErrors("root");

    try {
      const result = await loginMutation.mutateAsync(data);

      login({
        user: result.user,
        token: result.token,
      });
      router.replace("/");
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error ? error.message : "Server connection failed",
      });
    }
  };

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
          onSubmit={handleSubmit(handleLogin)}
        >
          <Input
            type="email"
            placeholder="Email"
            className="bg-surface/50"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="w-full text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
          <Input
            type="password"
            placeholder="Password"
            className="bg-surface/50"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="w-full text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
          {errors.root?.message && (
            <p className="w-full text-xs text-red-400">{errors.root.message}</p>
          )}
          <Button
            type="submit"
            className="bg-linear-to-r from-purple-500 to-blue-500 text-white text-[18px]"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </div>
    </section>
  );
}
