"use client"

import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComponentLayout } from "@/components/component-layout"

export default function AccordionsPage() {
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const handleAccordionChange = (value: string) => {
    setOpenItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6">Accordions</h1>
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Accordion State:</h2>
        <p>Open items: {openItems.join(", ") || "None"}</p>
      </div>
    </ComponentLayout>
  )
}
