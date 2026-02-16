"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ComponentLayout } from "@/components/component-layout"

export default function RadioButtonsPage() {
  const [selectedValue, setSelectedValue] = useState("")

  const handleValueChange = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Radio Buttons</h1>
      <div className="space-y-4" data-testid="radio-container">
        <RadioGroup onValueChange={handleValueChange} value={selectedValue} data-testid="radio-group">
          {["option1", "option2", "option3"].map((option) => (
            <div key={option} className="flex items-center space-x-2" data-testid={`radio-row-${option}`}>
              <RadioGroupItem value={option} id={option} data-testid={`radio-${option}`} />
              <Label htmlFor={option} data-testid={`radio-label-${option}`}>{`Option ${option.slice(-1)}`}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="mt-4" data-testid="radio-state">
        <h2 className="text-lg font-semibold mb-2">Selected Option:</h2>
        <p data-testid="selected-option">{selectedValue ? `Option ${selectedValue.slice(-1)}` : "None"}</p>
      </div>
    </ComponentLayout>
  )
}
