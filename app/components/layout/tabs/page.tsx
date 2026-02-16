"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ComponentLayout } from "@/components/component-layout"

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Tabs</h1>
      <div className="space-y-8" data-testid="tabs-container">
        <div className="space-y-4" data-testid="basic-tabs-section">
          <h2 className="text-xl font-semibold" data-testid="basic-tabs-title">Basic Tabs</h2>
          <Tabs defaultValue="account" className="w-full max-w-md" onValueChange={setActiveTab} data-testid="tabs">
            <TabsList className="grid w-full grid-cols-3" data-testid="tabs-list">
              <TabsTrigger value="account" data-testid="tab-trigger-account">Account</TabsTrigger>
              <TabsTrigger value="password" data-testid="tab-trigger-password">Password</TabsTrigger>
              <TabsTrigger value="settings" data-testid="tab-trigger-settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" data-testid="tab-content-account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Manage your account settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Your account details and information will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password" data-testid="tab-content-password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Password management options will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" data-testid="tab-content-settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure your application settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Application settings and preferences will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4" data-testid="controlled-tabs-section">
          <h2 className="text-xl font-semibold" data-testid="controlled-tabs-title">Programmatic Control</h2>
          <div className="flex gap-2" data-testid="tab-controls">
            <Button onClick={() => setActiveTab("account")} variant="outline" data-testid="go-to-account">
              Go to Account
            </Button>
            <Button onClick={() => setActiveTab("password")} variant="outline" data-testid="go-to-password">
              Go to Password
            </Button>
            <Button onClick={() => setActiveTab("settings")} variant="outline" data-testid="go-to-settings">
              Go to Settings
            </Button>
          </div>
        </div>

        <div data-testid="tabs-state">
          <h2 className="text-lg font-semibold">Tabs State:</h2>
          <p data-testid="active-tab">Active Tab: {activeTab}</p>
        </div>
      </div>
    </ComponentLayout>
  )
}
