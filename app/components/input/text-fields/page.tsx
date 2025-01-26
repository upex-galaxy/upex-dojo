"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function TextFieldsPage() {
  const [inputValue, setInputValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [emailValid, setEmailValid] = useState(true)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmailValue(value)
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
  }

  const handleClear = () => {
    setInputValue("")
  }

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setInputValue(text)
    })
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Text Fields</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="basic-input">Basic Input</Label>
          <Input id="basic-input" value={inputValue} onChange={handleInputChange} placeholder="Type here..." />
          <p>Current value: {inputValue}</p>
          <Button onClick={handleClear} className="mr-2">
            Clear
          </Button>
          <Button onClick={handlePaste}>Paste</Button>
        </div>
        <div>
          <Label htmlFor="email-input">Email Input</Label>
          <Input
            id="email-input"
            type="email"
            value={emailValue}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
          <p>Email valid: {emailValid ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  )
}

