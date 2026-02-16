"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComponentLayout } from "@/components/component-layout"

export default function ModalsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setInputValue("")
    }
  }

  const handleSubmit = () => {
    console.log("Submitted value:", inputValue)
    setIsOpen(false)
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Modals</h1>
      <div className="space-y-4" data-testid="modals-container">
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button variant="outline" data-testid="open-modal-button">Open Modal</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]" data-testid="modal-content">
            <DialogHeader>
              <DialogTitle data-testid="modal-title">Edit profile</DialogTitle>
              <DialogDescription data-testid="modal-description">Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4" data-testid="modal-form">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right" data-testid="name-label">
                  Name
                </Label>
                <Input
                  id="name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="col-span-3"
                  data-testid="name-input"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit} data-testid="save-button">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div data-testid="modal-state">
          <p data-testid="modal-status">Modal is {isOpen ? "open" : "closed"}</p>
          {inputValue && <p data-testid="last-submitted-value">Last submitted value: {inputValue}</p>}
        </div>
      </div>
    </ComponentLayout>
  )
}
