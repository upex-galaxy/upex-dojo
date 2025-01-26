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
      <h1 className="text-3xl font-bold mb-6">Dropdown Menus</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="fruit-select">Select a fruit</Label>
          <Select onValueChange={handleValueChange}>
            <SelectTrigger id="fruit-select" className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="elderberry">Elderberry</SelectItem>
            </SelectContent>
          </Select>
          <p className="mt-2">Selected fruit: {selectedValue}</p>
        </div>
      </div>
    </ComponentLayout>
  )
}

