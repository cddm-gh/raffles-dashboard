import { login } from '../actions/login'
import { signup } from '../actions/signup'
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
            <CardTitle>Welcome to Raffles</CardTitle>
            <CardDescription>Sign in to your account or create a new one.</CardDescription>
            </CardHeader>
            <form>
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
            <CardFooter className="flex flex-col space-y-2">
                <Button 
                type="submit" 
                formAction={login}
                className="w-full"
                >
                Log in
                </Button>
                <Button 
                type="submit" 
                formAction={signup}
                variant="outline"
                className="w-full"
                >
                Sign up
                </Button>
            </CardFooter>
            </form>
        </Card>
        </div>
    );
}