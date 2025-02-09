import Link from 'next/link'
import { login } from '../actions/login'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <form action={login}>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="name@example.com"
                    required 
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                    id="password" 
                    name="password" 
                    required 
                />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <Button 
                    type="submit" 
                    className="w-full"
                >
                    Sign in
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </CardFooter>
            </form>
        </Card>
        </div>
    );
}