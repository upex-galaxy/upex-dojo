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
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">File Uploads</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="file-upload">Choose a file</Label>
            <Input id="file-upload" type="file" onChange={handleFileChange} />
          </div>
          {file && (
            <div>
              <p>Selected file: {file.name}</p>
              <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
            </div>
          )}
          <Button onClick={simulateUpload} disabled={!file || uploadStatus === "uploading"}>
            {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
          </Button>
          {uploadStatus !== "idle" && (
            <div>
              <Progress value={uploadProgress} className="w-[60%]" />
              <p>Upload progress: {uploadProgress}%</p>
              {uploadStatus === "success" && <p>Upload completed successfully!</p>}
              {uploadStatus === "error" && <p>An error occurred during upload.</p>}
            </div>
          )}
        </div>
      </div>
  </ComponentLayout>
  )
}

