"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/schemas/authSchema";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const router = useRouter();

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
  const fields: { name: keyof RegisterFormValues; placeholder: string; type?: string }[] = [
    { name: "firstName", placeholder: "First Name" },
    { name: "lastName", placeholder: "Last Name" },
    { name: "username", placeholder: "Username" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "password", placeholder: "Password", type: "password" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {fields.map((field) => (
        <div key={field.name}>
          <Input
            placeholder={field.placeholder}
            type={field.type || "text"}
            {...register(field.name)}
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm">{errors[field.name]?.message}</p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        className="w-20 cursor-pointer bg-white text-black hover:bg-white transition"
      >
        Sign Up
      </Button>
    </form>
  );
}
