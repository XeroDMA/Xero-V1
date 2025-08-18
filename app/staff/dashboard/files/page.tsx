"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Upload,
  Download,
  Link,
  MoreHorizontal,
  Search,
  Filter,
  FileText,
  Archive,
  Trash2,
  Copy,
  Eye,
  Calendar,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface FileItem {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  downloads: number
  status: "active" | "inactive" | "expired"
  downloadLink?: string
}

export default function FilesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [generatedLink, setGeneratedLink] = useState("")

  const [files] = useState<FileItem[]>([
    {
      id: "1",
      name: "HWID-Spoofer-v2.1.exe",
      type: "Executable",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      downloads: 127,
      status: "active",
      downloadLink: "https://your-domain.com/dl/hwid-spoofer-abc123",
    },
    {
      id: "2",
      name: "DMA-Card-Firmware.bin",
      type: "Firmware",
      size: "512 KB",
      uploadDate: "2024-01-14",
      downloads: 89,
      status: "active",
      downloadLink: "https://your-domain.com/dl/dma-firmware-def456",
    },
    {
      id: "3",
      name: "Valorant-Colorbot-Setup.zip",
      type: "Archive",
      size: "15.2 MB",
      uploadDate: "2024-01-13",
      downloads: 203,
      status: "active",
      downloadLink: "https://your-domain.com/dl/valorant-colorbot-ghi789",
    },
    {
      id: "4",
      name: "Rust-Cheat-v1.8.exe",
      type: "Executable",
      size: "8.7 MB",
      uploadDate: "2024-01-10",
      downloads: 156,
      status: "inactive",
    },
    {
      id: "5",
      name: "Legacy-Spoofer-v1.0.exe",
      type: "Executable",
      size: "1.9 MB",
      uploadDate: "2024-01-05",
      downloads: 45,
      status: "expired",
    },
  ])

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUploadSubmit = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name)
      // Handle file upload to your Node.js backend
      setIsUploadDialogOpen(false)
      setSelectedFile(null)
    }
  }

  const generateDownloadLink = (fileId: string) => {
    // Generate unique download link
    const uniqueId = Math.random().toString(36).substring(2, 15)
    const link = `https://your-domain.com/dl/${fileId}-${uniqueId}`
    setGeneratedLink(link)
    setIsLinkDialogOpen(true)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary text-primary-foreground">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "executable":
        return <FileText className="w-4 h-4 text-primary" />
      case "archive":
        return <Archive className="w-4 h-4 text-accent" />
      case "firmware":
        return <FileText className="w-4 h-4 text-muted-foreground" />
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">File Management</h1>
            <p className="text-muted-foreground">Upload, manage, and generate download links for your files</p>
          </div>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-card-foreground">Upload New File</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Select a file to upload to the system
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="text-card-foreground">
                    Choose File
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileUpload}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                {selectedFile && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-card-foreground">
                      <strong>Selected:</strong> {selectedFile.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsUploadDialogOpen(false)}
                    className="border-border text-card-foreground"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUploadSubmit}
                    disabled={!selectedFile}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Files</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{files.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Active Files</CardTitle>
              <Eye className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {files.filter((f) => f.status === "active").length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Downloads</CardTitle>
              <Download className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {files.reduce((sum, file) => sum + file.downloads, 0)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Storage Used</CardTitle>
              <Archive className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">28.4 MB</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Files</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your uploaded files and download links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
              <Button variant="outline" className="border-border text-card-foreground bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-card-foreground">File</TableHead>
                    <TableHead className="text-card-foreground">Type</TableHead>
                    <TableHead className="text-card-foreground">Size</TableHead>
                    <TableHead className="text-card-foreground">Upload Date</TableHead>
                    <TableHead className="text-card-foreground">Downloads</TableHead>
                    <TableHead className="text-card-foreground">Status</TableHead>
                    <TableHead className="text-card-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.map((file) => (
                    <TableRow key={file.id} className="border-border">
                      <TableCell className="font-medium text-card-foreground">
                        <div className="flex items-center space-x-2">
                          {getFileIcon(file.type)}
                          <span>{file.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{file.type}</TableCell>
                      <TableCell className="text-muted-foreground">{file.size}</TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{file.uploadDate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{file.downloads}</TableCell>
                      <TableCell>{getStatusBadge(file.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover border-border">
                            <DropdownMenuItem
                              onClick={() => generateDownloadLink(file.id)}
                              className="text-popover-foreground hover:bg-accent"
                            >
                              <Link className="mr-2 h-4 w-4" />
                              Generate Link
                            </DropdownMenuItem>
                            {file.downloadLink && (
                              <DropdownMenuItem
                                onClick={() => copyToClipboard(file.downloadLink!)}
                                className="text-popover-foreground hover:bg-accent"
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Link
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Generated Link Dialog */}
        <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-card-foreground">Download Link Generated</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Your unique download link has been created
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <Label className="text-sm font-medium text-card-foreground">Download Link:</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input value={generatedLink} readOnly className="bg-input border-border text-foreground" />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(generatedLink)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsLinkDialogOpen(false)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
