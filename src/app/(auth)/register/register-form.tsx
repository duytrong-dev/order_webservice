"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"

export default function RegisterForm() {
  
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  async function onSubmit(values: RegisterBodyType) {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
      {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    ).then((res) => res.json())
    console.log(result)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[550px] flex-shrink-0 w-full ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và Tên</FormLabel>
              <FormControl>
                <Input placeholder="Họ và Tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Nhập lại mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="!mt-8 w-full">Đăng ký</Button>
      </form>
    </Form>
  )
}

{/* <FormDescription>
    Nhập họ và tên tại đây!
</FormDescription> */}
