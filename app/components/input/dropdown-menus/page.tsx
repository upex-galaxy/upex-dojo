"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ComponentLayout } from "@/components/component-layout"

export default function DropdownMenusPage() {
  const [selectedValue, setSelectedValue] = useState("")

  const handleValueChange = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Dropdown Menus</h1>
      <div className="space-y-4" data-testid="dropdown-container">
        <div data-testid="dropdown-section">
          <Label htmlFor="fruit-select" data-testid="dropdown-label">Select a fruit</Label>
          <Select onValueChange={handleValueChange}>
            <SelectTrigger id="fruit-select" className="w-[180px]" data-testid="dropdown-trigger">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent data-testid="dropdown-content">
              <SelectItem value="apple" data-testid="dropdown-option-apple">Apple</SelectItem>
              <SelectItem value="banana" data-testid="dropdown-option-banana">Banana</SelectItem>
              <SelectItem value="cherry" data-testid="dropdown-option-cherry">Cherry</SelectItem>
              <SelectItem value="date" data-testid="dropdown-option-date">Date</SelectItem>
              <SelectItem value="elderberry" data-testid="dropdown-option-elderberry">Elderberry</SelectItem>
            </SelectContent>
          </Select>
          <p className="mt-2" data-testid="selected-value">Selected fruit: {selectedValue}</p>
        </div>
      </div>
    </ComponentLayout>
  )
}
