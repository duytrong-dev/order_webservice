"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import clsx from "clsx"

export default function LoginForm() {
  
  const { toast } = useToast()
  const [isVisible, setIsVisible] = useState(false)

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      ).then( async (res) => {
        const payload = await res.json()
        const data = {
          status: res.status,
          payload: payload
        }
        if(!res.ok) throw data
        return data
      })
      toast({
        title: "Đăng nhập thành công!",
        description: result.payload.message
      })
    } catch (error:any) {
      console.log(error)
      const errors:{field: string, message: string}[] = error.payload.errors
      // const errors = error.payload.errors as {field: string, message: string}[]
      const status: number = error.status
      if(status === 422){
        errors.forEach((error) => {
          form.setError(error.field as ('email'|'password'),{
            type: 'server',
            message: error.message
          })
        })
      }else{
        toast({
          variant: "destructive",
          title: "Ôi không! Có lỗi!!!",
          description: error.payload.message,
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[550px] flex-shrink-0 w-full">
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
              <div className="relative">
                <FormControl>
                  <Input type={clsx("password", {'text' : isVisible})} className="pr-12" placeholder="Mật khẩu" {...field} />
                </FormControl>
                <div className="absolute top-[50%] translate-y-[-50%] right-2 p-2" onClick={(): void => {setIsVisible(!isVisible)}}>
                  <Eye className={clsx("scale-100 transition-all cursor-pointer",{'hidden scale-0'  : !isVisible})} strokeWidth={'1px'}/>
                  <EyeOff className={clsx("scale-100 transition-all cursor-pointer", {'hidden scale-0' : isVisible})} strokeWidth={'1px'}/>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="!mt-8 w-full">Đăng nhập</Button>
      </form>
    </Form>
  )
}

{/* <FormDescription>
    Nhập họ và tên tại đây!
</FormDescription> */}
