'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string || null

    console.log('Calling Supabase sign up with email and password:', email, password)
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                email,
                phone,
                permission: 'vendor'
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`
        }
    })

    if (error) {
        console.error('Authentication sign up error:', JSON.stringify(error))
        if (error.code === 'user_already_exists') {
            console.error('User already exists!')
        }
        redirect('/error?message=' + encodeURIComponent(error.message))
    }

    console.log('Redirecting to dashboard page')
    // Redirect to a confirmation page instead of dashboard since user needs to verify email
    redirect('/dashboard')
}