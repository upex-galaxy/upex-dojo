"use client"

import * as React from "react"
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
  { value: "vue", label: "Vue" },
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
]

export default function AutocompleteFieldsPage() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [inputValue, setInputValue] = React.useState("")

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Autocomplete Fields</h1>
      <div className="space-y-4" data-testid="autocomplete-container">
        <div data-testid="autocomplete-state">
          <h2 className="text-lg font-semibold mb-2">Autocomplete State:</h2>
          <p data-testid="selected-value">Selected Value: {value || "None"}</p>
          <p data-testid="input-value">Input Value: {inputValue || "None"}</p>
          <p data-testid="dropdown-status">Dropdown Open: {open ? "Yes" : "No"}</p>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between" data-testid="autocomplete-trigger">
              {value ? frameworks.find((framework) => framework.value === value)?.label : "Select framework..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" data-testid="autocomplete-popover">
            <Command data-testid="autocomplete-command">
              <CommandInput placeholder="Search framework..." onValueChange={setInputValue} data-testid="autocomplete-input" />
              <CommandList data-testid="autocomplete-list">
                <CommandEmpty data-testid="autocomplete-empty">No framework found.</CommandEmpty>
                <CommandGroup data-testid="autocomplete-group">
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                      data-testid={`autocomplete-option-${framework.value}`}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </ComponentLayout>
  )
}
