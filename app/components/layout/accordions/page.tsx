"use client"

import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComponentLayout } from "@/components/component-layout"

export default function AccordionsPage() {
  const [openItems, setOpenItems] = React.useState<string[]>([])

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Accordions</h1>
      <div data-testid="accordions-container">
        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} data-testid="accordion">
          <AccordionItem value="item-1" data-testid="accordion-item-1">
            <AccordionTrigger data-testid="accordion-trigger-1">Is it accessible?</AccordionTrigger>
            <AccordionContent data-testid="accordion-content-1">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" data-testid="accordion-item-2">
            <AccordionTrigger data-testid="accordion-trigger-2">Is it styled?</AccordionTrigger>
            <AccordionContent data-testid="accordion-content-2">
              Yes. It comes with default styles that matches the other components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" data-testid="accordion-item-3">
            <AccordionTrigger data-testid="accordion-trigger-3">Is it animated?</AccordionTrigger>
            <AccordionContent data-testid="accordion-content-3">Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="mt-4" data-testid="accordion-state">
        <h2 className="text-lg font-semibold">Accordion State:</h2>
        <p data-testid="open-items">Open items: {openItems.join(", ") || "None"}</p>
      </div>
    </ComponentLayout>
  )
}
