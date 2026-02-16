"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ComponentLayout } from "@/components/component-layout"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

export default function AlertsPage() {
  const [visibleAlerts, setVisibleAlerts] = useState({
    default: true,
    destructive: true,
    success: true,
    info: true,
  })

  const toggleAlert = (key: keyof typeof visibleAlerts) => {
    setVisibleAlerts((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const resetAlerts = () => {
    setVisibleAlerts({
      default: true,
      destructive: true,
      success: true,
      info: true,
    })
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Alerts</h1>
      <div className="space-y-6" data-testid="alerts-container">
        <div className="space-y-4" data-testid="alerts-section">
          {visibleAlerts.default && (
            <Alert data-testid="alert-default">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle data-testid="alert-default-title">Default Alert</AlertTitle>
              <AlertDescription data-testid="alert-default-description">
                This is a default alert. You can use it for general notifications.
              </AlertDescription>
            </Alert>
          )}

          {visibleAlerts.destructive && (
            <Alert variant="destructive" data-testid="alert-destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle data-testid="alert-destructive-title">Error Alert</AlertTitle>
              <AlertDescription data-testid="alert-destructive-description">
                Something went wrong. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {visibleAlerts.success && (
            <Alert className="border-green-500 text-green-700 dark:text-green-400" data-testid="alert-success">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle data-testid="alert-success-title">Success Alert</AlertTitle>
              <AlertDescription data-testid="alert-success-description">
                Your action was completed successfully!
              </AlertDescription>
            </Alert>
          )}

          {visibleAlerts.info && (
            <Alert className="border-blue-500 text-blue-700 dark:text-blue-400" data-testid="alert-info">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertTitle data-testid="alert-info-title">Information Alert</AlertTitle>
              <AlertDescription data-testid="alert-info-description">
                Here is some helpful information for you.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-4" data-testid="controls-section">
          <h2 className="text-xl font-semibold">Toggle Alerts</h2>
          <div className="flex flex-wrap gap-2" data-testid="toggle-buttons">
            <Button
              variant={visibleAlerts.default ? "default" : "outline"}
              onClick={() => toggleAlert("default")}
              data-testid="toggle-default"
            >
              Default
            </Button>
            <Button
              variant={visibleAlerts.destructive ? "destructive" : "outline"}
              onClick={() => toggleAlert("destructive")}
              data-testid="toggle-destructive"
            >
              Destructive
            </Button>
            <Button
              variant={visibleAlerts.success ? "default" : "outline"}
              onClick={() => toggleAlert("success")}
              className={visibleAlerts.success ? "bg-green-500 hover:bg-green-600" : ""}
              data-testid="toggle-success"
            >
              Success
            </Button>
            <Button
              variant={visibleAlerts.info ? "default" : "outline"}
              onClick={() => toggleAlert("info")}
              className={visibleAlerts.info ? "bg-blue-500 hover:bg-blue-600" : ""}
              data-testid="toggle-info"
            >
              Info
            </Button>
            <Button variant="secondary" onClick={resetAlerts} data-testid="reset-alerts">
              Reset All
            </Button>
          </div>
        </div>

        <div data-testid="alerts-state">
          <h2 className="text-lg font-semibold">Alerts State:</h2>
          <p data-testid="visible-alerts">
            Visible: {Object.entries(visibleAlerts).filter(([, v]) => v).map(([k]) => k).join(", ") || "None"}
          </p>
        </div>
      </div>
    </ComponentLayout>
  )
}
