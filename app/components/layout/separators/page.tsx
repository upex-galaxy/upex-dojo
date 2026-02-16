"use client"

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ComponentLayout } from "@/components/component-layout"

export default function SeparatorsPage() {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal")
  const [showDecorative, setShowDecorative] = useState(true)

  const toggleOrientation = () => {
    setOrientation((prev) => (prev === "horizontal" ? "vertical" : "horizontal"))
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Separators</h1>
      <div className="space-y-8" data-testid="separators-container">
        <div className="space-y-4" data-testid="horizontal-section">
          <h2 className="text-xl font-semibold" data-testid="horizontal-title">Horizontal Separator</h2>
          <div className="space-y-4" data-testid="horizontal-example">
            <div>
              <h4 className="text-sm font-medium leading-none" data-testid="section-heading">UPEX DOJO</h4>
              <p className="text-sm text-muted-foreground" data-testid="section-description">
                An open-source UI component library for QA automation practice.
              </p>
            </div>
            <Separator data-testid="horizontal-separator" />
            <div className="flex h-5 items-center space-x-4 text-sm" data-testid="section-links">
              <div data-testid="link-blog">Blog</div>
              <Separator orientation="vertical" data-testid="vertical-separator-1" />
              <div data-testid="link-docs">Docs</div>
              <Separator orientation="vertical" data-testid="vertical-separator-2" />
              <div data-testid="link-source">Source</div>
            </div>
          </div>
        </div>

        <div className="space-y-4" data-testid="vertical-section">
          <h2 className="text-xl font-semibold" data-testid="vertical-title">Vertical Separator</h2>
          <div className="flex h-20 items-center space-x-4" data-testid="vertical-example">
            <div className="space-y-1" data-testid="left-content">
              <h4 className="text-sm font-medium leading-none">Left Section</h4>
              <p className="text-sm text-muted-foreground">Content on the left</p>
            </div>
            <Separator orientation="vertical" data-testid="main-vertical-separator" />
            <div className="space-y-1" data-testid="middle-content">
              <h4 className="text-sm font-medium leading-none">Middle Section</h4>
              <p className="text-sm text-muted-foreground">Content in the middle</p>
            </div>
            <Separator orientation="vertical" data-testid="secondary-vertical-separator" />
            <div className="space-y-1" data-testid="right-content">
              <h4 className="text-sm font-medium leading-none">Right Section</h4>
              <p className="text-sm text-muted-foreground">Content on the right</p>
            </div>
          </div>
        </div>

        <div className="space-y-4" data-testid="interactive-section">
          <h2 className="text-xl font-semibold" data-testid="interactive-title">Interactive Demo</h2>
          <div className="flex flex-col gap-4" data-testid="interactive-controls">
            <div className="flex gap-2">
              <Button onClick={toggleOrientation} variant="outline" data-testid="toggle-orientation">
                Toggle Orientation
              </Button>
              <Button onClick={() => setShowDecorative(!showDecorative)} variant="outline" data-testid="toggle-decorative">
                Toggle Visibility
              </Button>
            </div>
            <div
              className={`flex ${orientation === "vertical" ? "h-20 items-center" : "flex-col"} gap-4 p-4 border rounded-md`}
              data-testid="interactive-demo"
            >
              <div data-testid="demo-content-1">Content Block 1</div>
              {showDecorative && (
                <Separator orientation={orientation} data-testid="interactive-separator" />
              )}
              <div data-testid="demo-content-2">Content Block 2</div>
            </div>
          </div>
        </div>

        <div className="space-y-4" data-testid="styled-section">
          <h2 className="text-xl font-semibold" data-testid="styled-title">Styled Separators</h2>
          <div className="space-y-4" data-testid="styled-examples">
            <div>
              <p className="text-sm mb-2">Default</p>
              <Separator data-testid="styled-default" />
            </div>
            <div>
              <p className="text-sm mb-2">Thick</p>
              <Separator className="h-1" data-testid="styled-thick" />
            </div>
            <div>
              <p className="text-sm mb-2">Colored</p>
              <Separator className="bg-primary" data-testid="styled-colored" />
            </div>
            <div>
              <p className="text-sm mb-2">Dashed (custom)</p>
              <div className="border-t-2 border-dashed border-muted-foreground" data-testid="styled-dashed" />
            </div>
          </div>
        </div>

        <div data-testid="separators-state">
          <h2 className="text-lg font-semibold">Separators State:</h2>
          <p data-testid="current-orientation">Interactive Orientation: {orientation}</p>
          <p data-testid="decorative-visible">Separator Visible: {showDecorative ? "Yes" : "No"}</p>
        </div>
      </div>
    </ComponentLayout>
  )
}
