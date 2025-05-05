"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ComponentLayout } from "@/components/component-layout"

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
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">
        Text Fields
      </h1>
      <div className="space-y-4" data-testid="text-fields-container">
        <div data-testid="input-section">
          <Label htmlFor="basic-input" data-testid="input-label">
            Basic Input
          </Label>
          <Input
            id="basic-input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type here..."
            data-testid="text-input"
          />
          <p data-testid="input-value">Current value: {inputValue}</p>
          <Button onClick={handleClear} className="mr-2" data-testid="clear-button">
            Clear
          </Button>
          <Button onClick={handlePaste} data-testid="paste-button">
            Paste
          </Button>
        </div>
        <div data-testid="input-section">
          <Label htmlFor="email-input" data-testid="input-label">
            Email Input
          </Label>
          <Input
            id="email-input"
            type="email"
            value={emailValue}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            data-testid="email-input"
          />
          <p data-testid="email-validation">Email valid: {emailValid ? "Yes" : "No"}</p>
        </div>
      </div>
    </ComponentLayout>
  )
}
