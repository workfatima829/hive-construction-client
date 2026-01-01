"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/schemas/authSchema";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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

    Cookies.set("token", res.data.token);
    Cookies.set("role", res.data.user.role);
    Cookies.set("username", res.data.user.username);

    router.push("/dashboard");
  } catch (err: any) {
    console.error(err);
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  <div>
    <Input
      placeholder="Email or Username"
      {...register("emailOrUsername")}
      className="h-11"
    />
    {errors.emailOrUsername && (
      <p className="text-red-500 text-xs mt-1">
        {errors.emailOrUsername.message}
      </p>
    )}
  </div>

  <div>
    <Input
      type="password"
      placeholder="Password"
      {...register("password")}
      className="h-11"
    />
    {errors.password && (
      <p className="text-red-500 text-xs mt-1">
        {errors.password.message}
      </p>
    )}
  </div>

  <Button
    type="submit"
    className="w-full h-11 rounded-lg bg-gradient-to-r from-black to-gray-800 text-white hover:opacity-90"
  >
    Login
  </Button>
</form>

  );
}
