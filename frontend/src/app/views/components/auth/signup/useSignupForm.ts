"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";

import { signupRequest, type SignupRequest } from "@/lib/api/modules";
import { useAuthStore } from "@/stores/authStore";

export function useSignupForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    resetField,
    formState: { errors },
  } = useForm<SignupRequest>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: signupRequest,
  });

  const onSubmit: SubmitHandler<SignupRequest> = async (data) => {
    clearErrors("root");

    try {
      const result = await signupMutation.mutateAsync(data);

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
    errors.name?.message ||
    errors.email?.message ||
    errors.password?.message ||
    errors.root?.message;

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending: signupMutation.isPending,
    formErrorMessage,
  };
}
