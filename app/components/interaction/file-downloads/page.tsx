"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download } from "lucide-react"

interface FileInfo {
  name: string
  size: string
  url: string
}

const file: FileInfo = {
  name: "cursos-blackhole.png",
  size: "2.5 MB",
  url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cursos-blackhole-RvmJiHKbSihL8WH5A8OvRwWCTQlzPV.png",
}

export default function FileDownloadsPage() {
  const [downloadProgress, setDownloadProgress] = React.useState(0)
  const [downloadStatus, setDownloadStatus] = React.useState<"idle" | "downloading" | "completed">("idle")

  const simulateDownload = () => {
    setDownloadStatus("downloading")
    setDownloadProgress(0)

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setDownloadStatus("completed")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleDownload = async () => {
    try {
      simulateDownload()
      const response = await fetch(file.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
      setDownloadStatus("idle")
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">File Downloads</h1>
      <div className="space-y-4">
        <div className="p-6 border rounded-lg bg-card">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="space-y-1">
              <h3 className="font-semibold">{file.name}</h3>
              <p className="text-sm text-muted-foreground">{file.size}</p>
            </div>
            <Button onClick={handleDownload} disabled={downloadStatus === "downloading"} className="mt-2 sm:mt-0">
              <Download className="mr-2 h-4 w-4" />
              {downloadStatus === "downloading" ? "Downloading..." : "Download"}
            </Button>
          </div>
          {downloadStatus !== "idle" && (
            <div className="space-y-2">
              <Progress value={downloadProgress} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{downloadProgress}%</span>
                {downloadStatus === "completed" && <span className="text-green-500">Download completed</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
