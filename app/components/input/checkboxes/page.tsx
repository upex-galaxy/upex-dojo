"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ComponentLayout } from "@/components/component-layout"

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
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Checkboxes</h1>
      <div className="space-y-4" data-testid="checkboxes-container">
        {Object.entries(checked).map(([id, isChecked]) => (
          <div key={id} className="flex items-center space-x-2" data-testid={`checkbox-row-${id}`}>
            <Checkbox id={id} checked={isChecked} onCheckedChange={() => handleCheckboxChange(id)} data-testid={`checkbox-${id}`} />
            <Label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              data-testid={`checkbox-label-${id}`}
            >
              {`Option ${id.slice(-1)}`}
            </Label>
          </div>
        ))}
      </div>
      <div className="mt-4" data-testid="checkboxes-state">
        <h2 className="text-lg font-semibold mb-2">Selected Options:</h2>
        <ul data-testid="selected-options-list">
          {Object.entries(checked)
            .filter(([, isChecked]) => isChecked)
            .map(([id]) => (
              <li key={id} data-testid={`selected-option-${id}`}>{`Option ${id.slice(-1)}`}</li>
            ))}
        </ul>
      </div>
    </ComponentLayout>
  )
}
