import Link from 'next/link'
import { signup } from '../actions/signup'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Sign up to get started with Raffles</CardDescription>
            </CardHeader>
            <form action={signup}>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                        id="name" 
                        name="name" 
                        type="text"
                        required 
                    />
                </div>
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
                    <Label htmlFor="phone">Phone Number (optional)</Label>
                    <Input 
                        id="phone" 
                        name="phone" 
                        type="tel"
                        placeholder="+1 (555) 000-0000"
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
