'use client'

import Link from 'next/link'
import { signup } from '../actions/signup'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export default function SignUpPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Sign up to get started with Raffles</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(async (data) => {
                try {
                    const formData = new FormData();
                    formData.append('name', data.name);
                    formData.append('email', data.email);
                    formData.append('password', data.password);
                    if (data.phone) {
                        formData.append('phone', data.phone);
                    }
                    await signup(formData);
                } catch (error) {
                    console.error('Signup failed:', error);
                }
            })}
            >
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                        id="name" 
                        type="text"
                        required 
                        {...register("name")} 
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        placeholder="name@example.com"
                        required 
                        {...register("email")} 
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (optional)</Label>
                    <Input 
                        id="phone" 
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...register("phone")} 
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password" 
                        required 
                        {...register("password")} 
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Re-enter Password</Label>
                    <PasswordInput
                        id="confirmPassword"
                        required 
                        {...register("confirmPassword")} 
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <Button 
                    type="submit" 
                    className="w-full"
                >
                    Create account
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Sign in
                    </Link>
                </p>
            </CardFooter>
            </form>
        </Card>
        </div>
    );
}
