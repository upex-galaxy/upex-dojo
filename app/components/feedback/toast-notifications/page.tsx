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

  return (
    <ComponentLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Toast Notifications</h1>
        <div className="space-y-4">
          <Button onClick={showSuccessToast} className="w-full">
            Show Success Toast
          </Button>
          <Button onClick={showErrorToast} className="w-full">
            Show Error Toast
          </Button>
        </div>
        <Toaster />
      </div>
    </ComponentLayout>
  )
}

