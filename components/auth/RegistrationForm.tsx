"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/schemas/authSchema";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
import router from "next/router";
export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        data
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
      <Input placeholder="First Name" {...register("firstName")} />
      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

      <Input placeholder="Last Name" {...register("lastName")} />
      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

      <Input placeholder="Username" {...register("username")} />
      {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

      <Input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <Button type="submit" className="w-20 cursor-pointer bg-white text-black hover:bg-white transition">
        Sign Up
      </Button>
    </form>
  );
}
