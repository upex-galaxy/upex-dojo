"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ComponentLayout } from "@/components/component-layout"


const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export default function MultiSelectDropdownsPage() {
  const [open, setOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleSelect = (currentValue: string) => {
    setSelectedValues((prev) =>
      prev.includes(currentValue) ? prev.filter((value) => value !== currentValue) : [...prev, currentValue],
    )
  }

  return (
    <ComponentLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Multi-Select Dropdowns</h1>
        <div className="space-y-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                {selectedValues.length > 0 ? `${selectedValues.length} selected` : "Select frameworks..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem key={framework.value} onSelect={() => handleSelect(framework.value)}>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedValues.includes(framework.value) ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div>
            <h2 className="text-lg font-semibold">Selected Frameworks:</h2>
            <ul>
              {selectedValues.map((value) => (
                <li key={value}>{frameworks.find((f) => f.value === value)?.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  </ComponentLayout>
  )
}

