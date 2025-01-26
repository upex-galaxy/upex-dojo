"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CheckboxesPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    option1: false,
    option2: false,
    option3: false,
  })

  const handleCheckboxChange = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Checkboxes</h1>
      <div className="space-y-4">
        {Object.entries(checked).map(([id, isChecked]) => (
          <div key={id} className="flex items-center space-x-2">
            <Checkbox id={id} checked={isChecked} onCheckedChange={() => handleCheckboxChange(id)} />
            <Label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {`Option ${id.slice(-1)}`}
            </Label>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Selected Options:</h2>
        <ul>
          {Object.entries(checked)
            .filter(([, isChecked]) => isChecked)
            .map(([id]) => (
              <li key={id}>{`Option ${id.slice(-1)}`}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}

