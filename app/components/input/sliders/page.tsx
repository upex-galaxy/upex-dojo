"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ComponentLayout } from "@/components/component-layout"

export default function SlidersPage() {
  const [singleValue, setSingleValue] = useState(50)
  const [rangeValues, setRangeValues] = useState([25, 75])

  const handleSingleSliderChange = (value: number[]) => {
    setSingleValue(value[0])
  }

  const handleRangeSliderChange = (value: number[]) => {
    setRangeValues(value)
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6">Sliders</h1>
      <div className="space-y-8">
        <div>
          <Label htmlFor="single-slider" className="text-lg font-semibold mb-2">
            Single Value Slider
          </Label>
          <Slider
            id="single-slider"
            min={0}
            max={100}
            step={1}
            value={[singleValue]}
            onValueChange={handleSingleSliderChange}
            className="w-[300px]"
          />
          <p className="mt-2">Current value: {singleValue}</p>
        </div>
        <div>
          <Label htmlFor="range-slider" className="text-lg font-semibold mb-2">
            Range Slider
          </Label>
          <Slider
            id="range-slider"
            min={0}
            max={100}
            step={1}
            value={rangeValues}
            onValueChange={handleRangeSliderChange}
            className="w-[300px]"
          />
          <p className="mt-2">
            Current range: {rangeValues[0]} - {rangeValues[1]}
          </p>
        </div>
      </div>
    </ComponentLayout>
  )
}

