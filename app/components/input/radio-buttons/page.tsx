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
      <h1 className="text-3xl font-bold mb-6">Radio Buttons</h1>
      <div className="space-y-4">
        <RadioGroup onValueChange={handleValueChange} value={selectedValue}>
          {["option1", "option2", "option3"].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{`Option ${option.slice(-1)}`}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Selected Option:</h2>
        <p>{selectedValue ? `Option ${selectedValue.slice(-1)}` : "None"}</p>
      </div>
    </ComponentLayout>
  )
}
