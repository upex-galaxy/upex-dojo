"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ComponentLayout } from "@/components/component-layout"

export default function FileUploadsPage() {
  const [file, setFile] = React.useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [uploadStatus, setUploadStatus] = React.useState<"idle" | "uploading" | "success" | "error">("idle")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setUploadStatus("idle")
      setUploadProgress(0)
    }
  }

  const simulateUpload = () => {
    if (!file) return

    setUploadStatus("uploading")
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setUploadStatus("success")
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">File Uploads</h1>
      <div className="space-y-4" data-testid="file-upload-container">
        <div data-testid="file-input-section">
          <Label htmlFor="file-upload" data-testid="file-input-label">Choose a file</Label>
          <Input id="file-upload" type="file" onChange={handleFileChange} data-testid="file-input" />
        </div>
        {file && (
          <div data-testid="file-info">
            <p data-testid="file-name">Selected file: {file.name}</p>
            <p data-testid="file-size">File size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
        <Button onClick={simulateUpload} disabled={!file || uploadStatus === "uploading"} data-testid="upload-button">
          {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
        </Button>
        {uploadStatus !== "idle" && (
          <div data-testid="upload-progress-section">
            <Progress value={uploadProgress} className="w-[60%]" data-testid="upload-progress-bar" />
            <p data-testid="upload-progress-value">Upload progress: {uploadProgress}%</p>
            {uploadStatus === "success" && <p data-testid="upload-success">Upload completed successfully!</p>}
            {uploadStatus === "error" && <p data-testid="upload-error">An error occurred during upload.</p>}
          </div>
        )}
      </div>
    </ComponentLayout>
  )
}
