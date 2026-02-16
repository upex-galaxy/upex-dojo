"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ComponentLayout } from "@/components/component-layout"

export default function ToastNotificationsPage() {
  const { toast } = useToast()

  const showSuccessToast = () => {
    toast({
      title: "Success!",
      description: "Your action was completed successfully.",
      variant: "default",
    })
  }

  const showErrorToast = () => {
    toast({
      title: "Error!",
      description: "There was a problem with your request.",
      variant: "destructive",
    })
  }

  const showCustomToast = () => {
    toast({
      title: "Custom Toast",
      description: "This is a custom toast with an action button.",
      action: (
        <Button variant="outline" size="sm" onClick={() => console.log("Toast action clicked")} data-testid="toast-undo-button">
          Undo
        </Button>
      ),
    })
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Toast Notifications</h1>
      <div className="space-y-4" data-testid="toasts-container">
        <Button onClick={showSuccessToast} className="w-full" data-testid="success-toast-button">
          Show Success Toast
        </Button>
        <Button onClick={showErrorToast} variant="destructive" className="w-full" data-testid="error-toast-button">
          Show Error Toast
        </Button>
        <Button onClick={showCustomToast} variant="outline" className="w-full" data-testid="custom-toast-button">
          Show Custom Toast
        </Button>
      </div>
      <Toaster />
    </ComponentLayout>
  )
}
