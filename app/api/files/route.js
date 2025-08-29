import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth.js"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Mock file data - replace with actual file system logic
  const files = [
    {
      id: "1",
      name: "HWID_Spoofer_v2.1.exe",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      downloads: 234,
      status: "active",
      downloadLink: "https://66.42.93.125/download/hwid-spoofer-v21",
    },
    {
      id: "2",
      name: "DMA_Config_Tool.zip",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      downloads: 189,
      status: "active",
      downloadLink: "https://66.42.93.125/download/dma-config-tool",
    },
  ]

  return NextResponse.json(files)
}

export async function POST(request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Mock file upload - implement actual file handling logic
    const fileId = `file_${Date.now()}`
    const downloadLink = `https://66.42.93.125/download/${fileId}`

    return NextResponse.json({
      success: true,
      file: {
        id: fileId,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split("T")[0],
        downloads: 0,
        status: "active",
        downloadLink,
      },
    })
  } catch (error) {
    console.error("File upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
