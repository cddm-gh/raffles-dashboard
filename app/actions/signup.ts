'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server-client'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: user, error } = await supabase.auth.signUp(data)

    console.log('Sign up data:', user)
    if (error) {
        console.error('Authentication sign up error:', error)
        if (error.code === 'user_already_exists') {
            console.error('User already exists!')
        }
        redirect('/error?message=' + encodeURIComponent(error.message))
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}