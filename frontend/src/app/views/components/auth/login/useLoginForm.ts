"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";

import { loginRequest, type LoginRequest } from "@/lib/api/modules";
import { useAuthStore } from "@/stores/authStore";

export function useLoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();
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

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending: loginMutation.isPending,
    formErrorMessage,
  };
}
