"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/schemas/authSchema";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          email: data.emailOrUsername,
          username: data.emailOrUsername,
          password: data.password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/welcome");
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input placeholder="Email or Username" {...register("emailOrUsername")} />
      {errors.emailOrUsername && (
        <p className="text-red-500 text-sm">
          {errors.emailOrUsername.message}
        </p>
      )}

      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && (
        <p className="text-red-500 text-sm">
          {errors.password.message}
        </p>
      )}

      <Button type="submit" className="w-20 cursor-pointer bg-white text-black hover:bg-white transition">
        Login
      </Button>
    </form> 
  );
}
