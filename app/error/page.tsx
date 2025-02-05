'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'

export default function ErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('message') || 'Something went wrong'

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <XCircle className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Oops! An error occurred
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {errorMessage}
        </p>
        <div className="mt-6 flex gap-2">
          <Button
            onClick={() => router.back()}
            variant="outline"
          >
            Go Back
          </Button>
          <Button
            onClick={() => router.push('/')}
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  )
}